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

### Google Search Console

Ngày 2026-09-07:

- Domain Property `baolocbds.com` đã xác minh quyền sở hữu thành công.
- Phương thức xác minh: DNS / Nhà cung cấp tên miền.
- DNS TXT verification được lưu tại Cloudflare và phải được giữ nguyên.
- Sitemap `https://baolocbds.com/sitemap-index.xml` đã submit thành công trong Google Search Console.

**BL-SEO-030 = DONE (foundation).**

Theo dõi tiếp theo trong Search Console: discovery/indexing, coverage và search queries khi Google bắt đầu thu thập dữ liệu.

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

CTA intent mapping hiện tại:

- Tổng quan -> `quan-tam-du-an`;
- Giá bán -> `bang-gia`;
- Chính sách -> `chinh-sach`;
- Mặt bằng -> `mat-bang`.

Mapping được khai báo reusable theo `pageSlug`, không nhét form vào mọi project page.

Commit: `d009b58` — `BL-LEAD-010: add reusable CTA intent mapping`.

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

Package `ws` từng được cài chỉ để diagnostic, sau đó đã gỡ. `@supabase/supabase-js` cũng đã được gỡ vì Lead API cuối cùng dùng native REST `fetch()`.

Ngày 2026-09-08, `BL-LEAD-002` hardening hoàn tất:

- invalid JSON request -> `400 INVALID_REQUEST`;
- invalid phone -> `400 INVALID_PHONE`;
- Supabase non-ok -> `500 SAVE_FAILED`;
- unexpected server/network exception -> `500 SERVER_ERROR`;
- không còn gán nhầm exception phía server thành `400 INVALID_REQUEST`.

Commit API hardening: `e966d45` — `BL-LEAD-002: separate client and server API errors`.

## 15. LeadCapture component

`src/components/LeadCapture.astro` hiện có:

- phone required;
- name optional;
- intent prop;
- source URL tự ghi;
- client validation;
- submit loading state;
- disable button trong lúc gửi để tránh submit lặp;
- success/error feedback;
- responsive mobile 1 cột;
- xử lý explicit `INVALID_PHONE` từ API;
- fallback an toàn khi API response không phải JSON;
- khôi phục đúng CTA label gốc sau submit.

UI error chung giữ copy thân thiện: `Chưa gửi được. Bạn thử lại hoặc liên hệ Zalo giúp mình.`

Commits hardening client:

- `14b0b2a` — preserve lead CTA button label;
- `4136a05` — handle invalid phone responses;
- `c6447b2` — handle invalid API responses safely.

## 16. Lead Capture V1 — PRODUCTION E2E PASS

Ngày 2026-09-07 đã deploy production và smoke-test thành công toàn bộ flow:

`baolocbds.com -> LeadCapture -> POST /api/leads -> Cloudflare Worker -> Supabase public.leads -> success UI`

Kết quả xác minh:

- production build PASS;
- Wrangler deploy PASS;
- form trên `/du-an/phu-gia-bao-loc/gia-ban/` submit thành công;
- UI trả: `Đã nhận thông tin. Mình sẽ liên hệ sớm.`;
- record mới xuất hiện trong Supabase;
- `intent = bang-gia`;
- `source_url = /du-an/phu-gia-bao-loc/gia-ban/`;
- phone normalize đúng E.164.

Cloudflare deployment checkpoint:

- Worker: `baolocbds`
- Version ID: `4dad9cd1-77fb-4d93-a597-0e9d9b8436e4`

**BL-LEAD-001 = DONE. Lead Capture V1 foundation = DONE.**

## 17. Lead conversion checkpoint 2026-09-08

DONE:

- `BL-LEAD-010` — CTA intent mapping;
- `BL-LEAD-011` — reusable project CTA strategy;
- `BL-LEAD-002` — error handling hardening.

Validation gần nhất:

- `npm run build`: PASS;
- 4 intent smoke tests: PASS;
- Hero 3 CTA smoke tests: PASS;
- invalid phone smoke test: PASS;
- success flow giữ đúng success copy và CTA label: PASS;
- local branch sạch và đồng bộ sau commit `e966d45`.

Anti-spam và lead operations chưa làm; chỉ mở khi có nhu cầu thực tế để tránh overbuild.

## 18. Content Engine direction

Ngày 2026-09-08 chốt hướng mở rộng nội dung: BAO LOC BDS không chỉ có project fact pages mà cần thêm lớp editorial/search-intent để xây topical authority và đa dạng organic entry points.

Content engine dự kiến gồm:

1. Project facts — nguồn thông tin chuẩn, fact-first;
2. Experience / Review — trải nghiệm, ghi nhận thực địa, ưu/nhược điểm, không giả trải nghiệm;
3. Question / Search intent — trả lời truy vấn dài và câu hỏi thực tế;
4. Market context — kết nối dự án với thị trường, hạ tầng và câu chuyện Bảo Lộc.

Nguyên tắc:

- không copy Facebook/sales copy thành bài SEO;
- không tạo hàng loạt bài mỏng chỉ để tăng URL;
- cảm nhận phải phân biệt với fact;
- fact pháp lý/giá/chính sách phải kiểm chứng và có ngày cập nhật khi cần;
- ưu tiên ảnh/ghi nhận thực tế và nội dung gốc;
- internal linking phải đưa authority về project hub và liên kết sang market/finance content;
- core posts phải tái sử dụng cho nhiều dự án, không hard-code Phú Gia Bảo Lộc.

Bài gợi ý `Trải nghiệm Phú Gia Bảo Lộc – nơi ấn tượng ngay từ lần đầu đặt chân đến` được xem là seed idea, không phải nội dung để copy trực tiếp.

## 19. Known issues / technical debt

- `posts` collection hiện trống; build có message ở dynamic routes Thị trường/Tài chính nhưng không fail.
- project hero image trong project route vẫn hard-code đường dẫn Phú Gia Bảo Lộc; technical debt cũ, chưa xử lý.
- npm hiện báo 11 vulnerabilities (2 moderate, 9 high). Không dùng `npm audit fix --force`; cần review có kiểm soát sau.

## 20. Next exact action

**BL-CONTENT-050 — Posts collection foundation.**

Đọc hiện trạng content collections, routes `/thi-truong` và `/tai-chinh`, schema hiện có trước khi sửa.

Mục tiêu: thiết kế Posts collection thành content engine tái sử dụng, hỗ trợ editorial/search-intent, metadata SEO và liên kết project bằng dữ liệu động; không hard-code Phú Gia Bảo Lộc vào core.
