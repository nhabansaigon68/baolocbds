# BAO LOC BDS — PROJECT STATE

> Domain: `baolocbds.com`  
> Cập nhật: 2026-09-16

## 1. Trạng thái tổng thể

BAO LOC BDS đã hoàn tất giai đoạn xây nền tảng và đang ở **RUN & MEASURE**.

Chuỗi hiện tại:

`BUILD nền tảng ✓ -> SEO foundation ✓ -> Content foundation ✓ -> Internal graph ✓ -> Lead availability hardening ✓ -> Google crawl/index -> MEASURE -> cải tiến theo dữ liệu`

Mục tiêu:
- tài sản SEO và bán hàng BĐS dài hạn tại Bảo Lộc;
- topical authority theo project cluster;
- nội dung fact-first, có nguồn;
- chuyển traffic thành lead;
- kiến trúc tái sử dụng, không hard-code project vào reusable core.

**Không còn active coding task.** Trọng tâm phát triển kỹ thuật chuyển lại **nhaHub**.

## 2. Môi trường kỹ thuật bắt buộc

- MacBook Air Early 2014, Intel, RAM 8 GB.
- macOS Big Sur 11.7.11; Wrangler có thể cảnh báo unsupported macOS — không nâng macOS chỉ để xử lý warning.
- Node.js 20.20.2 — giữ nguyên.
- npm 10.8.2.
- Astro 5.18.2.
- `@astrojs/cloudflare` 12.6.13.
- Wrangler 4.59.2 — giữ nguyên nếu không có task compatibility cụ thể.
- DEV: `astro.config.dev.mjs`, `output: "static"`.
- Production/server: `astro.config.cloudflare.mjs`, `output: "server"`, Cloudflare adapter.
- `wrangler.jsonc`: Worker `baolocbds`, entry `./dist/_worker.js/index.js`.
- Không merge/xóa ba config: `astro.config.mjs`, `astro.config.dev.mjs`, `astro.config.cloudflare.mjs`.
- Không chạy `npm audit fix --force`.
- Không commit `.env` hoặc `.venv-image`.

Cloudflare `workerd/miniflare` yêu cầu macOS mới hơn Big Sur, nên Cloudflare server runtime local không phải mục tiêu hỗ trợ trên máy hiện tại. Không phá DEV static để né giới hạn này.

Production hiện có auto-deployment sau GitHub push; ngày 2026-09-16 quan sát deployment Cloudflare xuất hiện khoảng 2 phút sau push. Không deploy thủ công nếu không có lý do và chưa được P đồng ý.

## 3. Phú Gia Bảo Lộc — project cluster

Phú Gia Bảo Lộc là project cluster đầu tiên, dùng Astro Content Collections.

12 routes:
- `/du-an/phu-gia-bao-loc/`
- `/du-an/phu-gia-bao-loc/vi-tri/`
- `/du-an/phu-gia-bao-loc/quy-hoach/`
- `/du-an/phu-gia-bao-loc/phap-ly/`
- `/du-an/phu-gia-bao-loc/tien-do/`
- `/du-an/phu-gia-bao-loc/mat-bang/`
- `/du-an/phu-gia-bao-loc/tien-ich/`
- `/du-an/phu-gia-bao-loc/san-pham/`
- `/du-an/phu-gia-bao-loc/gia-ban/`
- `/du-an/phu-gia-bao-loc/chinh-sach/`
- `/du-an/phu-gia-bao-loc/thu-vien-anh/`
- `/du-an/phu-gia-bao-loc/faq/`

Toàn bộ 12 route build PASS.

Reusable UI:
- `src/components/ProjectHero.astro`
- `src/components/ProjectNav.astro`

ProjectNav sinh động từ collection, sort theo `order`, có active state và mobile horizontal scroll; không hard-code danh sách tab.

## 4. Lead Capture V1 — DONE

Production flow:

`baolocbds.com -> LeadCapture -> POST /api/leads -> Cloudflare Worker -> Supabase public.leads -> success UI`

LeadCapture V1:
- phone required;
- name optional;
- intent từ CTA/page;
- source URL tự ghi;
- normalize phone về E.164 `+84...`;
- validation client/server/DB;
- loading state, disable submit, success/error feedback;
- safe response parsing;
- responsive mobile.

Supabase `public.leads` lưu:
- `id`
- `phone_raw`
- `phone_normalized`
- `name`
- `intent`
- `source_url`
- `created_at`

CTA intent mapping:
- Tổng quan -> `quan-tam-du-an`;
- Giá bán -> `bang-gia`;
- Chính sách -> `chinh-sach`;
- Mặt bằng -> `mat-bang`.

### OPS-001 — Supabase Lead Availability — DONE 2026-09-16

Supabase Free gửi cảnh báo inactivity. Vì Lead Capture phụ thuộc Supabase, production availability được harden theo hướng tối thiểu, READ-only, không tạo lead giả.

#### OPS-001A — Supabase Health Endpoint — DONE

Endpoint production:

`GET /api/health/supabase`

Implementation:
- file `src/pages/api/health/supabase.ts`;
- `prerender = false`;
- READ-only Supabase REST query: `leads?select=id&limit=1`;
- không INSERT lead giả;
- không expose secret;
- `Cache-Control: no-store` khi success;
- log lỗi cấu hình/Supabase/runtime;
- success contract: `200 {"ok":true,"service":"supabase"}`.

Commit foundation:
- `0c381e1` — `OPS-001A: add Supabase health endpoint`.

#### OPS-001A.1 — Cloudflare Runtime Bindings Fix — DONE

Production test ban đầu trả `500 SERVER_CONFIG_ERROR`. Điều tra xác định:
- Cloudflare có `SUPABASE_SECRET_KEY`;
- bổ sung `SUPABASE_URL` = `https://nqzwffxjldnzplccqgba.supabase.co` dưới dạng Worker secret binding;
- cả `/api/health/supabase` và `/api/leads` trước đó đọc secrets bằng `import.meta.env`, không đúng cơ chế runtime bindings của stack Astro 5 + Cloudflare hiện tại.

Fix:
- `src/env.d.ts`: khai báo Cloudflare `Runtime<Env>` cho `App.Locals`;
- health handler nhận `locals` và đọc `locals.runtime.env`;
- lead handler nhận `locals` và đọc `locals.runtime.env`;
- không đổi LeadCapture, Supabase schema, REST payload, validation hoặc API contract.

TEST:
- `npm run build` PASS sau khi bổ sung runtime typing;
- production `GET /api/health/supabase` trả `HTTP/2 200`;
- response JSON length 32, `application/json`, `Cache-Control: no-store`;
- xác nhận Cloudflare Worker -> runtime bindings -> Supabase REST -> `public.leads` READ hoạt động.

#### OPS-001B — Scheduled Supabase Health Check — DONE

External scheduler: `cron-job.org`.

Job:
- title: `baolocbds Supabase Health`;
- URL: `https://baolocbds.com/api/health/supabase`;
- method: GET;
- timezone: `Asia/Ho_Chi_Minh`;
- cron: `0 8,14,20 * * *`;
- chạy mỗi ngày lúc 08:00, 14:00, 20:00;
- job enabled;
- test run ngày 2026-09-16: `200 OK`, duration ~1.32s.

Mục đích: tạo database READ activity định kỳ và đồng thời kiểm tra đường Lead dependency. Không dùng fake lead/INSERT để giữ project active.

Sau OPS-001, BAO LOC BDS quay lại **RUN & MEASURE**. Không mở thêm availability infrastructure nếu chưa có failure thực tế.

## 5. SEO technical foundation — DONE

Đã có:
- title + meta description;
- canonical;
- Open Graph;
- Twitter Card;
- absolute social image URL;
- `site: https://baolocbds.com`;
- sitemap;
- `robots.txt`;
- `WebSite` JSON-LD;
- `Organization` JSON-LD;
- `BreadcrumbList` JSON-LD cho project pages.

Google Search Console:
- Domain Property `baolocbds.com` verified bằng DNS TXT ngày 2026-09-07;
- sitemap-index.xml submit thành công;
- ngày 2026-09-08 Search Console đã khám phá 22 URL;
- homepage đã được gửi yêu cầu lập chỉ mục thủ công.

Trạng thái index sớm được xem là bình thường; không can thiệp kỹ thuật khi chưa có dữ liệu crawl/index đủ rõ.

## 6. BL-SEO-034 — DONE

**Phú Gia Bảo Lộc Contextual Internal Linking** hoàn tất ngày 2026-09-09.

Commit:
- `00782b3` — `SEO-034: strengthen Phu Gia contextual internal linking`

Scope:
- 12 Markdown pages;
- 31 insertions, 31 deletions;
- contextual links theo semantic relationship;
- hub <-> deep pages có liên kết hai chiều tự nhiên;
- FAQ đóng vai trò semantic router;
- không tạo URL mới;
- không đổi facts;
- không đổi architecture;
- không redesign ProjectNav;
- không ảnh hưởng Lead Capture.

TEST PASS:
- `npm run build` (`astro check && astro build`);
- contextual links resolve, không 404/malformed URL;
- đủ 12 URL trong sitemap;
- ProjectNav hiện diện trên 12 pages;
- Lead Capture/contact signals còn nguyên.

## 7. Content Engine foundation — DONE

Posts collection hỗ trợ:
- `title`;
- `pubDate`;
- `publishedAt`;
- `updatedAt`;
- `description`;
- `author`;
- `category`;
- `contentType`;
- `searchIntent`;
- `projectSlug`;
- image `{ url, alt }`;
- `readingTime`.

Đã có editorial article layout, cover images, list typography, `PostRecommendations.astro`, Related + Latest, homepage article cards, routing theo category, publication ordering và build/visual smoke PASS.

Editorial cluster hiện có 7 bài content thật. Các bài tiếp theo không còn là active coding task; chỉ tiếp tục khi có giá trị vận hành/search intent rõ.

## 8. Media / Image SEO foundation

Pipeline ảnh:
- WebP;
- cạnh dài tối đa 1200px;
- quality 78;
- không upscale;
- filename semantic;
- alt text thật;
- không đưa source/original nặng vào `public`;
- script `scripts/optimize-content-image.sh`;
- Pillow trong `.venv-image` local, không commit Git.

Ảnh/video mới tiếp tục dùng cho content/evidence media khi phù hợp; không tạo code task chỉ để chèn thêm media.

## 9. Fact / Source of Truth cần giữ lại

Known fact conflict:
- 9,1 ha vs 9,12 ha.

Không tự sửa theo cảm tính. Cần reconcile trong Project Fact Sheet / Source of Truth trước khi chuẩn hóa toàn site.

Nguyên tắc content:
- không copy sales copy;
- không dùng hype như fact;
- không giả trải nghiệm;
- pháp lý/giá/chính sách phải kiểm chứng;
- time-sensitive content phải có ngày cập nhật;
- ưu tiên ảnh/ghi nhận thực tế;
- internal linking phải phục vụ ngữ nghĩa, không quota link.

## 10. Known issues / technical debt — NON-BLOCKING

- `/lien-he/index.astro` hiện chưa có nội dung hoàn chỉnh; chỉ mở task khi P muốn hoàn thiện contact page riêng.
- project hero image trong project route còn hard-code đường dẫn Phú Gia Bảo Lộc;
- `PostRecommendations` và một số list route có thể cần chuẩn hóa `publishedAt ?? pubDate` khi content lớn hơn;
- Related/Latest có thể cần dedupe khi số bài tăng;
- `/tai-chinh/[slug]` chưa unify hoàn toàn presentation với `/thi-truong/[slug]`;
- npm từng báo 11 vulnerabilities (2 moderate, 9 high); review theo exploitability/compatibility, không dùng `npm audit fix --force`.

Không xử lý các điểm này chỉ vì “đẹp code”. Chỉ mở task khi chúng trở thành vấn đề vận hành thực tế.

## 11. Điều kiện để mở lại coding task BAO LOC BDS

Chỉ quay lại code khi có ít nhất một tín hiệu:
1. production error/regression;
2. Search Console/traffic data chỉ ra vấn đề kỹ thuật cụ thể;
3. lead thật cho thấy workflow hiện tại thiếu chức năng;
4. project thứ hai tạo ra nhu cầu tái sử dụng/refactor thật;
5. security issue có exploitability thực tế.

Anti-spam chỉ làm khi có spam thật. Lead operations chỉ xây khi có lead thật. Analytics chỉ mở rộng khi traffic đủ để đo.

## 12. NEXT EXACT STATE

**RUN & MEASURE — không có active coding task.**

Theo dõi:
- Google crawl/indexing và Search Console;
- production health;
- cron-job.org history, đặc biệt xác nhận lần scheduled execution đầu tiên sau 14:00 ngày 2026-09-16;
- traffic/search queries;
- lead và conversion signals;
- cập nhật fact/content/media khi có dữ liệu mới.

Ưu tiên nguồn lực coding hiện tại: **nhaHub**.
