# BAO LOC BDS — PROJECT STATE

> Domain: `baolocbds.com`  
> Cập nhật: 2026-09-08

## 1. Mục tiêu

BAO LOC BDS là tài sản nội dung và bán hàng BĐS dài hạn tại Bảo Lộc, ưu tiên:

- SEO Google và topical authority;
- project cluster theo từng dự án;
- nội dung fact-first, có nguồn;
- chuyển đổi traffic thành lead;
- kiến trúc tái sử dụng, không hard-code một dự án vào core.

Phú Gia Bảo Lộc là project cluster đầu tiên.

## 2. Môi trường kỹ thuật và ràng buộc

- MacBook Air Early 2014, Intel, RAM 8 GB.
- macOS Big Sur 11.7.11.
- Node.js 20.20.2 — khóa, không nâng chỉ để xử lý warning dependency.
- npm 10.8.2.
- Astro 5.18.2.
- `@astrojs/cloudflare` 12.6.13.
- Wrangler 4.59.2.
- DEV dùng `astro.config.dev.mjs`, `output: "static"`.
- Production/server dùng Cloudflare config riêng.
- Không merge/xóa ba config: `astro.config.mjs`, `astro.config.dev.mjs`, `astro.config.cloudflare.mjs`.
- Không chạy `npm audit fix --force`.

### Cloudflare local runtime limitation

Cloudflare `workerd/miniflare` yêu cầu macOS >= 13.5. Big Sur không chạy được Cloudflare server runtime local. Đây là giới hạn môi trường, không phải lỗi application.

Không sửa bằng cách nâng Node/macOS hoặc phá DEV static.

## 3. Dependency compatibility

Warning `undici@8.10.0` đến từ:

`astro@5.18.2 -> unifont@0.7.5 -> undici@8.10.0`

Không phải do sitemap hay Supabase. Production build hiện vẫn PASS trên Node 20.20.2.

## 4. Phú Gia Bảo Lộc — content architecture

Đã xây project content cluster bằng Astro Content Collections.

Routes:

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

Toàn bộ 12 route đã build PASS.

Project content nằm dưới `src/content/projects/` và dùng schema dữ liệu gồm các field chính: `title`, `projectName`, `description`, `navTitle`, `order`, `publishedAt`, `updatedAt`, `cover`, `location`, `status`, `category`.

## 5. UI project

Đã tạo reusable components:

- `src/components/ProjectHero.astro`
- `src/components/ProjectNav.astro`

ProjectHero: ảnh cover, project title, description, location/status, CTA, responsive.

ProjectNav: tự sinh từ collection, sort bằng `order`, active state, mobile horizontal scroll, không hard-code danh sách tab.

Desktop/mobile smoke test: PASS.

Ngày 2026-09-08 đã nâng cấp CTA architecture:

- `Xem giá bán`;
- `Đăng ký xem dự án`;
- `Zalo tư vấn`.

`ProjectHero` nhận `priceUrl`, `visitUrl`, `zaloUrl` qua props; Zalo URL được đưa vào config thay vì hard-code trong reusable component; `priceUrl` tạo động theo `projectSlug`; CTA xem dự án anchor-scroll về LeadCapture Tổng quan.

Commit: `12bf3e0` — `BL-LEAD-011: refine reusable project CTA strategy`.

## 6. Homepage

Trang chủ đã lấy project nổi bật động từ collection `projects`.

Ngày 2026-09-08 section bài viết đã được nâng từ 2 lên **4 bài mới nhất**.

Posts sort theo:
1. `publishedAt` nếu có;
2. fallback `pubDate`.

Điều này giải quyết trường hợp nhiều bài cùng ngày nhưng vẫn cần thứ tự xuất bản chính xác.

## 7. Media Phú Gia Bảo Lộc

Asset project chuẩn hóa tại `public/images/projects/phu-gia-bao-loc/` với filename semantic.

Content media mới dùng pipeline riêng:

- WebP;
- cạnh dài tối đa 1200px;
- quality 78;
- không upscale;
- source/original không đưa vào `public`;
- script `scripts/optimize-content-image.sh`;
- Pillow chạy bằng local virtualenv `.venv-image`;
- `.venv-image` không commit Git.

Media bài viết đã có semantic assets như:

- `bao-loc-khong-gian-song-nghi-duong.webp`;
- `phu-gia-bao-loc-duong-noi-khu-thuc-te.webp`;
- `phu-gia-bao-loc-khong-gian-tien-ich-song.webp`;
- `phu-gia-bao-loc-canh-quan-tien-ich-thuc-te.webp`;
- `phu-gia-bao-loc-so-do-san-pham.webp`.

## 8. SEO technical foundation

DONE:

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

`@astrojs/sitemap@3.7.4` đã cài. Production build sinh `dist/sitemap-index.xml` và `dist/sitemap-0.xml`.

`robots.txt` trỏ tới `https://baolocbds.com/sitemap-index.xml`.

### Google Search Console

Ngày 2026-09-07:
- Domain Property `baolocbds.com` verified bằng DNS TXT;
- sitemap-index.xml submit thành công.

Ngày 2026-09-08:
- Search Console đã khám phá 22 URL;
- 0 indexed tại thời điểm kiểm tra;
- homepage ở trạng thái `Đã phát hiện thấy – hiện chưa được lập chỉ mục`;
- chưa có lần crawl gần nhất;
- đã gửi yêu cầu lập chỉ mục thủ công cho homepage.

Trạng thái này hiện được xem là bình thường trong giai đoạn rất sớm; ưu tiên tiếp tục content + internal linking thay vì can thiệp kỹ thuật vội.

## 9. Nguồn nội dung ERA Agent

Đã thu thập landing nội bộ ERA Agent cho Phú Gia Bảo Lộc. Chỉ dùng như nguồn sales/content nội bộ để khai thác fact, USP và cấu trúc thông tin.

Nguyên tắc:

- không copy sales copy;
- không dùng hype như fact;
- pháp lý/chính sách quan trọng phải đối chiếu nguồn gốc;
- ưu tiên fact-first và voice riêng của BAO LOC BDS.

Các số liệu như 9.1 ha / 9.12 ha phải reconcile trước khi chuẩn hóa toàn site.

## 10. Lead Capture V1 — quyết định sản phẩm

Mục tiêu: SEO -> traffic -> lead với friction thấp.

Visible fields:
- Số điện thoại — bắt buộc;
- Tên — optional.

Không hỏi dropdown nhu cầu ở V1. `intent` suy ra từ CTA/page. `sourceUrl` tự ghi.

Phone normalize về E.164 `+84...`. Validation tồn tại ở client, server và DB.

CTA intent mapping hiện tại:
- Tổng quan -> `quan-tam-du-an`;
- Giá bán -> `bang-gia`;
- Chính sách -> `chinh-sach`;
- Mặt bằng -> `mat-bang`.

Commit: `d009b58`.

## 11. Supabase lead storage

`public.leads` gồm:
- `id`
- `phone_raw`
- `phone_normalized`
- `name`
- `intent`
- `source_url`
- `created_at`

RLS enabled. `service_role` có quyền cần thiết để API server ghi lead.

## 12. Secrets policy

Local `.env` chứa server secrets và được `.gitignore` bảo vệ.

Cloudflare Runtime Variables:
- `SUPABASE_URL` = Text;
- `SUPABASE_SECRET_KEY` = Secret.

Không commit hoặc expose secrets client-side.

## 13. Lead API

`src/pages/api/leads.ts` dùng native `fetch()` gọi Supabase REST.

Không dùng Supabase Realtime trong Lead V1.

Error semantics hiện tại:
- invalid JSON -> `400 INVALID_REQUEST`;
- invalid phone -> `400 INVALID_PHONE`;
- Supabase non-ok -> `500 SAVE_FAILED`;
- unexpected exception -> `500 SERVER_ERROR`.

## 14. LeadCapture component

`src/components/LeadCapture.astro` có:
- phone required;
- name optional;
- intent prop;
- source URL tự ghi;
- client validation;
- submit loading state;
- disable button khi gửi;
- success/error feedback;
- responsive mobile;
- safe response parsing;
- restore đúng CTA label.

## 15. Lead Capture V1 — PRODUCTION E2E PASS

Production flow đã PASS:

`baolocbds.com -> LeadCapture -> POST /api/leads -> Cloudflare Worker -> Supabase public.leads -> success UI`

Worker checkpoint:
- Worker: `baolocbds`
- Version ID: `4dad9cd1-77fb-4d93-a597-0e9d9b8436e4`

**Lead Capture V1 foundation = DONE.**

## 16. Content Engine foundation — DONE

Ngày 2026-09-08, `BL-CONTENT-050` foundation hoàn tất.

Posts collection hiện hỗ trợ:
- `title`;
- `pubDate`;
- `publishedAt` optional cho thứ tự chính xác;
- `updatedAt`;
- `description`;
- `author`;
- `category`;
- `contentType`;
- `searchIntent`;
- `projectSlug`;
- image `{ url, alt }`;
- `readingTime`.

Đã có:
- article detail editorial layout cho `/thi-truong/[slug]`;
- cover image trong article;
- typography lists;
- reusable `PostRecommendations.astro`;
- Related + Latest sections;
- homepage article cards;
- routing theo category;
- precise publication ordering trên homepage;
- build và visual smoke PASS.

Foundation commits tiêu biểu:
- `7e3dbbd` — schema extension;
- `ffc67c7` — seed/editorial presentation;
- `da3a5eb` — homepage route + covers;
- `1ee83a1` — recommendations;
- `d0f8233` — WebP image standard.

## 17. Editorial cluster — current state

Hiện đã có **7 bài content thật**:

1. Bất động sản Bảo Lộc: 7 nhóm thông tin nên kiểm tra trước khi xuống tiền
2. Đất Bảo Lộc: 5 lỗi thường gặp khi chỉ nhìn giá rẻ
3. Mua đất Bảo Lộc nên kiểm tra pháp lý gì?
4. Bảo Lộc phù hợp để ở, nghỉ dưỡng hay đầu tư?
5. Phú Gia Bảo Lộc ở đâu? Cách nhìn vị trí đúng hơn quảng cáo
6. Phú Gia Bảo Lộc phù hợp với ai?
7. Những điều nên kiểm tra trước khi xem Phú Gia Bảo Lộc

Bài #7:
- có `publishedAt: 2026-09-08T15:00:00+07:00`;
- cover thực địa WebP;
- ảnh sơ đồ sản phẩm chen trong body;
- build PASS;
- desktop/mobile visual PASS;
- commit `42da043` — `BL-CONTENT-053: add Phu Gia viewing checklist and latest-post ordering`.

Kế hoạch initial batch 10 bài còn:

8. Trải nghiệm Phú Gia Bảo Lộc: những điều đáng chú ý khi đến dự án — chỉ viết khi đủ tư liệu thật.
9. Cách đọc chính sách thanh toán dự án BĐS.
10. Hạ tầng Bảo Lộc: phân biệt cái đã có và cái còn là kỳ vọng.

## 18. Content principles

Content engine theo 4 lớp:

1. Project facts — nguồn thông tin chuẩn, fact-first;
2. Experience / Review — trải nghiệm thật, không giả;
3. Question / Search intent — truy vấn dài và câu hỏi thực tế;
4. Market context — kết nối dự án với thị trường và Bảo Lộc.

Nguyên tắc:
- không copy Facebook/sales copy thành bài SEO;
- không tạo hàng loạt bài mỏng;
- cảm nhận phải phân biệt với fact;
- pháp lý/giá/chính sách phải kiểm chứng;
- ưu tiên ảnh/ghi nhận thực tế;
- internal linking phải đưa authority về project hub;
- core posts phải tái sử dụng cho nhiều dự án.

## 19. Known issues / technical debt

- project hero image trong project route vẫn hard-code đường dẫn Phú Gia Bảo Lộc;
- `PostRecommendations` và các list route khác hiện vẫn cần kiểm tra để chuẩn hóa cùng logic `publishedAt ?? pubDate` nếu muốn semantics `latest` hoàn toàn thống nhất;
- Related/Latest có thể cần dedupe khi content nhiều hơn;
- `/tai-chinh/[slug]` chưa được unify hoàn toàn với editorial presentation của `/thi-truong/[slug]`;
- npm hiện báo 11 vulnerabilities (2 moderate, 9 high). Không dùng `npm audit fix --force`.

## 20. Next exact action

**BL-CONTENT-053 — Bài #8 trong editorial cluster.**

Trước khi viết bài trải nghiệm Phú Gia Bảo Lộc, rà lại media thật đang có (ảnh/video thực địa) và chỉ dùng chi tiết có bằng chứng trực quan hoặc ghi nhận thực tế.

Nếu tư liệu chưa đủ để tạo một bài experience đúng nghĩa, không ép viết. Chuyển sang bài #9 `Cách đọc chính sách thanh toán dự án BĐS` để giữ chuẩn fact-first.
