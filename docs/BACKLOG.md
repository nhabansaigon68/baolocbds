# BAO LOC BDS — BACKLOG

> Domain: `baolocbds.com`  
> Cập nhật: 2026-09-16

Priority: P0 = blocking, P1 = quan trọng, P2 = tăng trưởng, P3 = tối ưu sau.

## OPERATING MODE — RUN & MEASURE

BAO LOC BDS đang ở **RUN & MEASURE**.

Chuỗi vận hành:

`BUILD nền tảng ✓ -> SEO foundation ✓ -> Content foundation ✓ -> Internal graph ✓ -> Lead availability hardening ✓ -> Contact/Lead notification ✓ -> Google crawl/index -> MEASURE -> cải tiến theo dữ liệu`

Nguyên tắc ưu tiên:
- không mở thêm task code chỉ vì backlog còn mục chưa DONE;
- chỉ quay lại code khi có lỗi production, dữ liệu Search Console/traffic chỉ ra vấn đề kỹ thuật cụ thể, hoặc lead thật cho thấy workflow hiện tại chưa đủ;
- content, media, fact update và theo dõi Search Console tiếp tục như công việc vận hành;
- ưu tiên nguồn lực phát triển cho **nhaHub**.

## DONE — OPS-001 Supabase Lead Availability

### OPS-001A — Supabase Health Endpoint

**Status: DONE — 2026-09-16**

Production endpoint:
- `GET https://baolocbds.com/api/health/supabase`
- READ-only Supabase REST: `public.leads`, `select=id&limit=1`;
- không INSERT/fake lead;
- không expose server secret;
- success: HTTP 200 + `{"ok":true,"service":"supabase"}`;
- `Cache-Control: no-store`.

Commit:
- `0c381e1` — `OPS-001A: add Supabase health endpoint`.

### OPS-001A.1 — Cloudflare Runtime Bindings Fix

**Status: DONE — 2026-09-16**

Production health test ban đầu trả `500 SERVER_CONFIG_ERROR` dù Worker có secret. Root cause: API routes đọc Cloudflare runtime bindings bằng `import.meta.env`.

Đã sửa:
- Cloudflare Worker có đủ `SUPABASE_SECRET_KEY` và `SUPABASE_URL`;
- `SUPABASE_URL`: `https://nqzwffxjldnzplccqgba.supabase.co`;
- `src/env.d.ts` khai báo `Runtime<Env>` cho `App.Locals`;
- `/api/health/supabase` dùng `locals.runtime.env`;
- `/api/leads` cũng chuyển sang `locals.runtime.env`;
- không đổi LeadCapture, Supabase schema, payload, validation hoặc API contract.

Verification:
- `npm run build` PASS;
- production health endpoint trả HTTP/2 200;
- Cloudflare -> runtime bindings -> Supabase REST -> leads READ PASS.

Lưu ý vận hành: GitHub push có thể kích hoạt Cloudflare auto-deployment; manual deploy chỉ khi có lý do/approval rõ.

### OPS-001B — Scheduled Supabase Health Check

**Status: DONE — 2026-09-16**

External scheduler: cron-job.org.

Configuration:
- job: `baolocbds Supabase Health`;
- GET `https://baolocbds.com/api/health/supabase`;
- timezone `Asia/Ho_Chi_Minh`;
- cron `0 8,14,20 * * *`;
- executions: 08:00 / 14:00 / 20:00 mỗi ngày;
- enabled;
- manual Test Run PASS: `200 OK`, ~1.32s.

Operational follow-up only:
- kiểm tra History nếu có failure notification/history bất thường;
- không mở thêm coding task cho OPS-001 nếu không có failure thực tế.

## DONE — Lead Capture Production Verification

### BL-LEAD-001 — Production E2E Lead Smoke Test

**Status: DONE — 2026-09-07; re-verified 2026-09-16**

Production flow hiện tại:

`baolocbds.com -> LeadCapture -> POST /api/leads -> Cloudflare Worker -> Supabase public.leads -> Resend email notification`

Verified:
- form submit;
- success UI;
- Supabase record;
- intent mapping;
- source URL;
- E.164 phone normalization;
- Cloudflare deployment;
- email notification delivery.

Ngày 2026-09-16 runtime binding access của `/api/leads` được harden trong OPS-001A.1 và email notification được bổ sung trong OPS-002.

### BL-LEAD-002 — Error handling hardening

**Status: DONE — 2026-09-08**

DONE:
- client/server phone validation;
- `INVALID_PHONE`, `INVALID_REQUEST`, `SAVE_FAILED`, `SERVER_ERROR`;
- disable submit khi gửi;
- restore đúng CTA label;
- safe parse khi API không trả JSON;
- mobile form responsive.

### BL-LEAD-010 — CTA intent mapping

**Status: DONE — 2026-09-08; extended 2026-09-16**

Mapping:
- tổng quan -> `quan-tam-du-an`;
- giá bán -> `bang-gia`;
- chính sách -> `chinh-sach`;
- mặt bằng -> `mat-bang`;
- liên hệ -> `contact-general`.

### BL-LEAD-011 — CTA strategy

**Status: DONE — 2026-09-08**

Project hero:
- `Xem giá bán`;
- `Đăng ký xem dự án`;
- `Zalo tư vấn`.

CTA architecture reusable, không hard-code link Zalo trong component.

### BL-LEAD-013 — Contact page

**Status: DONE — 2026-09-16**

Production route:
- `https://baolocbds.com/lien-he/`

DONE:
- copy hướng conversion;
- phone / Zalo / email CTA;
- SEO metadata;
- dùng chung `LeadCapture.astro`;
- `intent=contact-general`;
- responsive desktop/mobile;
- build PASS;
- production visual PASS;
- production lead submit PASS;
- email notification PASS.

Commit:
- `df707da` — `SEO-035: add contact page foundation`.

## DONE — OPS-002 Lead Email Notification

**Status: DONE — 2026-09-16**

Mục tiêu: P nhận thông báo email ngay sau khi lead được lưu thành công vào Supabase.

Architecture:

`LeadCapture -> /api/leads -> Supabase save -> Resend API -> notification email`

Implementation:
- `src/services/lead-notification.ts`;
- `/api/leads` gọi notification sau khi Supabase save thành công;
- email lỗi không làm mất lead đã lưu;
- notification gồm name, phone, intent, source URL;
- không hard-code API key trong repo.

Cloudflare Worker secrets:
- `RESEND_API_KEY`;
- `LEAD_NOTIFICATION_TO`;
- `LEAD_NOTIFICATION_FROM`.

Resend:
- domain `baolocbds.com` đã cấu hình/verify;
- sender dùng domain `baolocbds.com`;
- secret/API key giữ ngoài source code.

Production verification:
- `/lien-he/` -> Supabase PASS -> email PASS;
- `/du-an/phu-gia-bao-loc/` -> `intent=quan-tam-du-an` -> Supabase PASS -> email PASS.

Không mở thêm Zalo/Telegram notification nếu email hiện tại đủ dùng.

## P1 — Lead conversion — CONDITION BASED

### BL-LEAD-003 — Anti-spam foundation

Chỉ làm khi có spam thật. Ưu tiên honeypot/rate limiting/duplicate suppression; chỉ thêm Turnstile khi cần.

### BL-LEAD-012 — Lead operations

Chỉ kích hoạt khi có lead thật cần quản lý vòng đời. Workflow tối thiểu: lead mới, đã liên hệ, ghi chú, trạng thái. Không xây CRM lớn trong V1.

## DONE — SEO Foundation Registration

### BL-SEO-030 — Google Search Console

**Status: DONE — foundation 2026-09-07**

- Domain Property verified bằng DNS TXT.
- Sitemap `https://baolocbds.com/sitemap-index.xml` submit thành công.
- Search Console ngày 2026-09-08 đã khám phá 22 URL, 0 indexed.
- Homepage ở trạng thái sớm `Đã phát hiện thấy – hiện chưa được lập chỉ mục` và đã gửi yêu cầu lập chỉ mục thủ công ngày 2026-09-08.

Không xem đây là lỗi kỹ thuật ở thời điểm hiện tại; tiếp tục theo dõi crawl/indexing trước khi can thiệp.

### BL-SEO-034 — Phú Gia Bảo Lộc Contextual Internal Linking

**Status: DONE — 2026-09-09**

Commit: `00782b3` — `SEO-034: strengthen Phu Gia contextual internal linking`

Đã hoàn tất contextual internal linking trong 12 Markdown pages:
- 12 files changed;
- 31 insertions, 31 deletions;
- hub <-> deep pages có quan hệ semantic tự nhiên;
- FAQ đóng vai trò semantic router;
- không tạo URL mới;
- không đổi facts;
- không thay ProjectNav/core.

TEST PASS: build, links, sitemap, ProjectNav và Lead Capture/contact signals.

### SEO-035 — Contact Page Foundation

**Status: DONE — 2026-09-16**

Xem BL-LEAD-013 ở trên.

## P1 — Phú Gia Bảo Lộc Content Upgrade — MAINTENANCE

### BL-PGBL-020 — Project Fact Sheet / Source of Truth

Chuẩn hóa fact sheet trước khi publish claim quan trọng: tên pháp lý/thương mại, chủ đầu tư/pháp nhân, địa chỉ/toạ độ, diện tích, số lượng sản phẩm, QH 1/500, pháp lý, loại sản phẩm, tiến độ, chính sách, ngân hàng hỗ trợ.

Reconcile số liệu như 9.1 ha / 9.12 ha trước khi chuẩn hóa toàn site.

### BL-PGBL-021 — Tổng quan content pass

Bổ sung fact/USP hữu ích từ nguồn chính thức sau khi verify; không biến trang thành sales copy.

### BL-PGBL-022 — Vị trí content pass

Bổ sung POI, thời gian di chuyển và kết nối khi có nguồn đáng tin.

### BL-PGBL-023 — Pháp lý content pass

Ưu tiên quy hoạch, hồ sơ pháp lý, quyền sử dụng đất, xây dựng, sổ; chỉ publish claim đã kiểm chứng.

### BL-PGBL-024 — Tiện ích content pass

Khai thác tiện ích nội khu, cảnh quan, trải nghiệm sống và bộ ảnh semantic hiện có.

### BL-PGBL-025 — Chính sách content pass

Khai thác tiến độ thanh toán, vay, ân hạn, ưu đãi khi còn hiệu lực; nội dung time-sensitive phải có ngày cập nhật.

### BL-PGBL-026 — FAQ search intent

Xây FAQ từ câu hỏi thật: vị trí, chủ đầu tư, pháp lý, sổ, giá, vay, diện tích, khoảng cách trung tâm, xây dựng, chính sách.

## P1 — SEO — MEASURE BEFORE BUILD

### BL-SEO-031 — Validate structured data

Kiểm tra production WebSite, Organization, BreadcrumbList; URL tuyệt đối và JSON-LD hợp lệ. Không blocking RUN & MEASURE nếu production không phát sinh lỗi.

### BL-SEO-032 — Project metadata

Mỗi subpage cần title/description/canonical/OG image/heading intent riêng. Chỉ ưu tiên tiếp khi Search Console hoặc SERP data cho thấy cần cải tiến.

### BL-SEO-033 — Image SEO

**Status: FOUNDATION DONE — 2026-09-08**

Pipeline:
- WebP thật;
- cạnh dài tối đa 1200px;
- quality 78;
- không upscale;
- filename semantic;
- alt text thật;
- không giữ source/original trong `public`;
- `scripts/optimize-content-image.sh`;
- Pillow trong `.venv-image`.

## P1 — Homepage — MEASURE FIRST

### BL-HOME-040 — Featured Project Card Content

Project lấy động từ collection. Homepage hiện hiển thị 4 bài mới nhất và sort theo `publishedAt`, fallback `pubDate`.

Refine CTA/location/status/mobile conversion chỉ khi dữ liệu thực tế cho thấy cần.

## P1 — Content Engine — FOUNDATION DONE / OPERATIONS CONTINUE

### BL-CONTENT-050 — Posts collection foundation

**Status: DONE — 2026-09-08**

Đã có schema mở rộng, editorial detail layout, cover image, typography, routing, `PostRecommendations.astro`, Related + Latest, homepage latest ordering và build PASS.

### BL-CONTENT-053 — Project Editorial / Experience Cluster

**Status: PAUSED AS ACTIVE DEVELOPMENT — continue as content operations when useful**

Nguyên tắc:
- không copy sales post;
- không giả trải nghiệm;
- fact và cảm nhận tách biệt;
- pháp lý/giá/chính sách cần source + ngày cập nhật khi cần;
- ưu tiên ảnh thực địa, media semantic và internal linking;
- mỗi bài phải có search intent hoặc vai trò topical authority rõ.

Seed articles đã publish/commit: 7 bài. Các bài tiếp theo chỉ publish khi đủ tư liệu và có search intent rõ.

### BL-CONTENT-051 — Thị trường Bảo Lộc

Content operations: hạ tầng, quy hoạch, khu vực, giá, giao dịch, quan sát thị trường, câu chuyện địa phương.

### BL-CONTENT-052 — Tài chính BĐS

Content operations: vay mua BĐS, dòng tiền, lịch thanh toán, cách đọc chính sách, chi phí sở hữu. Không đưa tư vấn tài chính thiếu căn cứ.

## P2 — Analytics — ACTIVATE WHEN TRAFFIC EXISTS

### BL-DATA-060 — Lead attribution

Sau khi có traffic, cân nhắc lưu `utm_source`, `utm_medium`, `utm_campaign`, `referrer`, `landing_page`.

### BL-DATA-061 — Conversion events

Khi có đủ traffic để đo, theo dõi click Zalo, phone, open lead form, successful lead và project engagement.

## P2 — Architecture

### BL-ARCH-070 — Multi-project reusability

Tiếp tục nguyên tắc không hard-code Phú Gia Bảo Lộc trong reusable core. Không refactor chỉ vì “đẹp code” nếu chưa có project thứ hai cần dùng.

## P3 — Security / Hardening

### BL-SEC-080 — Supabase privileges review

Review least privilege, RLS và production secrets khi có lý do vận hành/security cụ thể.

### BL-SEC-081 — Dependency audit

Hiện npm từng báo 11 vulnerabilities (2 moderate, 9 high). Review theo exploitability và compatibility. Không chạy `npm audit fix --force`.

## DO NOT DO

- Không nâng Node tùy tiện.
- Không nâng macOS/Wrangler chỉ để xử lý warning hiện tại.
- Không ép workerd chạy trên Big Sur.
- Không chuyển DEV static sang server chỉ để smoke-test.
- Không commit `.env` hoặc `.venv-image`.
- Không expose server secrets client-side.
- Không dùng fake lead/INSERT làm keep-alive Supabase.
- Không chạy `npm audit fix --force`.
- Không hard-code Phú Gia Bảo Lộc vào reusable core.
- Không copy sales copy ERA.
- Không publish pháp lý/chính sách chưa kiểm chứng.
- Không tạo hàng loạt bài SEO mỏng chỉ để tăng URL.
- Không đưa ảnh raw/original nặng trực tiếp vào `public` nếu chưa tối ưu.
- Không tiếp tục code BAO LOC BDS chỉ để “hoàn thành backlog”.

## NEXT

**RUN & MEASURE — không có active coding task.**

Theo dõi:
1. Google crawl/indexing và Search Console;
2. production health + cron-job.org History;
3. traffic/search queries khi bắt đầu có dữ liệu;
4. lead thật và conversion signals;
5. email notification delivery nếu có lead thật;
6. chỉ mở lead operations/anti-spam khi dữ liệu thực tế yêu cầu.

Trọng tâm phát triển kỹ thuật: **nhaHub**.
