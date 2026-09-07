# BAO LOC BDS — PROJECT STATE

> Domain: `baolocbds.com`  
> Cập nhật: 2026-09-07

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

## 6. Homepage

Trang chủ đã lấy project nổi bật động từ collection `projects`. Phú Gia Bảo Lộc xuất hiện trong section dự án nổi bật mà không cần card hard-code riêng.

## 7. Media Phú Gia Bảo Lộc

Asset đã chuẩn hóa tại `public/images/projects/phu-gia-bao-loc/`, gồm các ảnh semantic như:

- `tong-quan.jpg`
- `biet-thu-phu-gia-bao-loc.jpg`
- `duong-noi-khu-phu-gia-bao-loc.jpg`
- `canh-quan-ho-nuoc-phu-gia-bao-loc.jpg`
- `khu-vui-choi-tre-em-phu-gia-bao-loc.jpg`
- `thap-nghieng-pisa-phu-gia-bao-loc.jpg`
- `tieu-canh-nghe-thuat-phu-gia-bao-loc.jpg`
- `vuon-hoa-phu-gia-bao-loc.jpg`
- `vuon-rau-canh-quan-phu-gia-bao-loc.jpg`

Nguyên tắc: filename semantic + alt text theo nội dung thật.

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

Checkpoint gần nhất: `astro check` PASS 0 errors / 0 warnings / 0 hints; production build PASS.

## 9. Nguồn nội dung ERA Agent

Đã thu thập landing nội bộ ERA Agent cho Phú Gia Bảo Lộc. Chỉ dùng như nguồn sales/content nội bộ để khai thác fact, USP và cấu trúc thông tin.

Nguyên tắc:

- không copy sales copy;
- không dùng hype như fact;
- pháp lý/chính sách quan trọng phải đối chiếu nguồn gốc;
- ưu tiên fact-first và voice riêng của BAO LOC BDS.

Các điểm hữu ích đã ghi nhận gồm: quy mô khoảng 9.12 ha, 357 sản phẩm, compound/gated community, QH 1/500, sổ hồng từng nền, vị trí/kết nối, tiện ích, chính sách thanh toán/vay.

Số liệu như 9.1 ha và 9.12 ha cần reconciliation trước khi chuẩn hóa toàn site.

## 10. Lead Capture V1 — quyết định sản phẩm

Mục tiêu: SEO -> traffic -> lead với friction thấp.

Visible fields:

- Số điện thoại — bắt buộc.
- Tên — optional.

Không hỏi dropdown nhu cầu ở V1. `intent` suy ra từ CTA/page. `sourceUrl` tự ghi.

Phone là string, normalize về E.164 `+84...`. Validation tồn tại ở client, server và DB.

## 11. Supabase lead storage

Đã tạo `public.leads` với fields:

- `id`
- `phone_raw`
- `phone_normalized`
- `name`
- `intent`
- `source_url`
- `created_at`

Có constraint format `phone_normalized`, index phone và created_at, RLS enabled.

Đã cấp quyền cho `service_role`:

- SELECT, INSERT trên `public.leads`;
- USAGE, SELECT trên `public.leads_id_seq`.

## 12. Secrets policy

Local `.env` chứa:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

`.env` được `.gitignore` bảo vệ.

Cloudflare Runtime Variables đã cấu hình:

- `SUPABASE_URL` = Text
- `SUPABASE_SECRET_KEY` = Secret

Secret chỉ server-side, không client-side, không commit GitHub, không ghi giá trị vào docs.

## 13. Supabase connectivity test

Direct DB insert từ Node 20 đã PASS với record test `TEST LOCAL`.

Điều này xác nhận URL, secret, Data API, permissions, table và DB constraint hoạt động.

## 14. Lead API

Đã tạo `src/pages/api/leads.ts`, `POST /api/leads`, `prerender = false`.

API thực hiện parse/validate/normalize/sanitize và insert Supabase qua REST bằng native `fetch()`.

Không dùng Supabase Realtime trong Lead V1. Quyết định này giảm dependency runtime và tránh WebSocket requirement trên Node 20.

Package `ws` từng được cài chỉ để diagnostic, sau đó đã gỡ.

## 15. LeadCapture component

Đã tạo `src/components/LeadCapture.astro` với phone required, name optional, intent prop, source URL, client validation, loading state, POST `/api/leads`, success/error feedback và responsive UI.

Hiện mount thử trên `/du-an/phu-gia-bao-loc/gia-ban/` với `intent = bang-gia`.

## 16. Lead Capture current status

PASS:

- Supabase direct DB insert.
- Lead API `astro check`.
- LeadCapture `astro check`.

CHƯA VERIFY end-to-end:

Browser form -> `/api/leads` -> Cloudflare runtime -> Supabase -> success UI.

Lý do: Big Sur không chạy được Cloudflare runtime local.

Lead Capture V1 CHƯA được đánh dấu DONE.

## 17. Known issues

- `posts` collection hiện trống; build có message ở dynamic routes Thị trường/Tài chính nhưng không fail.
- npm hiện báo 11 vulnerabilities (2 moderate, 9 high). Không dùng `npm audit fix --force`; cần review có kiểm soát sau.

## 18. Checkpoint 2026-09-07

- Project UI: PASS
- Project responsive: PASS
- Project content routes: PASS
- Homepage project discovery: PASS
- SEO foundation: PASS
- Sitemap: PASS
- Robots: PASS
- Structured data: PASS
- Supabase database: PASS
- Direct DB insert: PASS
- Lead component check: PASS
- Lead API check: PASS
- Production E2E Lead test: PENDING

## 19. Next exact action

1. Build production.
2. Deploy Cloudflare.
3. Mở `/du-an/phu-gia-bao-loc/gia-ban/`.
4. Submit một lead test.
5. Verify record trong Supabase.
6. Verify success UI.
7. Chỉ khi PASS mới đánh dấu Lead Capture V1 DONE.
