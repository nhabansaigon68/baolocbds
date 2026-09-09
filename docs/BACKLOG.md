# BAO LOC BDS — BACKLOG

> Domain: `baolocbds.com`  
> Cập nhật: 2026-09-09

Priority: P0 = blocking, P1 = quan trọng, P2 = tăng trưởng, P3 = tối ưu sau.

## OPERATING MODE — RUN & MEASURE

Từ 2026-09-09, BAO LOC BDS chuyển từ giai đoạn build nền tảng sang **RUN & MEASURE**.

Chuỗi vận hành hiện tại:

`BUILD nền tảng ✓ -> SEO foundation ✓ -> Content foundation ✓ -> Internal graph ✓ -> Google crawl/index -> MEASURE -> cải tiến theo dữ liệu`

Nguyên tắc ưu tiên:
- không mở thêm task code chỉ vì backlog còn mục chưa DONE;
- chỉ quay lại code khi có lỗi production, dữ liệu Search Console/traffic chỉ ra vấn đề kỹ thuật cụ thể, hoặc lead thật cho thấy workflow hiện tại chưa đủ;
- content, media, fact update và theo dõi Search Console tiếp tục như công việc vận hành;
- ưu tiên nguồn lực phát triển cho dự án nhaHub.

## DONE — Lead Capture Production Verification

### BL-LEAD-001 — Production E2E Lead Smoke Test

**Status: DONE — 2026-09-07**

Production flow đã PASS:

`baolocbds.com -> LeadCapture -> POST /api/leads -> Cloudflare Worker -> Supabase public.leads`

Verified: form submit, success UI, Supabase record, intent mapping, source URL, E.164 phone normalization và Cloudflare deployment đều PASS.

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

**Status: DONE — 2026-09-08**

Mapping hiện tại:
- tổng quan -> `quan-tam-du-an`;
- giá bán -> `bang-gia`;
- chính sách -> `chinh-sach`;
- mặt bằng -> `mat-bang`.

### BL-LEAD-011 — CTA strategy

**Status: DONE — 2026-09-08**

Project hero hiện có:
- `Xem giá bán`;
- `Đăng ký xem dự án`;
- `Zalo tư vấn`.

CTA architecture reusable, không hard-code link Zalo trong component.

## DONE — SEO Foundation Registration

### BL-SEO-030 — Google Search Console

**Status: DONE — foundation 2026-09-07**

- Domain Property verified bằng DNS TXT.
- Sitemap `https://baolocbds.com/sitemap-index.xml` submit thành công.
- Search Console ngày 2026-09-08 đã khám phá 22 URL, 0 indexed.
- Homepage đang ở trạng thái `Đã phát hiện thấy – hiện chưa được lập chỉ mục`, chưa có lần crawl gần nhất.
- Đã gửi yêu cầu lập chỉ mục thủ công cho homepage ngày 2026-09-08.

Không xem đây là lỗi kỹ thuật ở thời điểm hiện tại; tiếp tục theo dõi crawl/indexing trước khi can thiệp kỹ thuật.

### BL-SEO-034 — Phú Gia Bảo Lộc Contextual Internal Linking

**Status: DONE — 2026-09-09**

Commit: `00782b3` — `SEO-034: strengthen Phu Gia contextual internal linking`

Đã hoàn tất contextual internal linking trong 12 Markdown pages của cluster Phú Gia Bảo Lộc:
- 12 files changed;
- 31 insertions, 31 deletions;
- hub <-> deep pages có quan hệ semantic tự nhiên;
- FAQ đóng vai trò semantic router;
- không tạo URL mới;
- không đổi facts;
- không thay ProjectNav/core.

TEST PASS:
- `npm run build` (bao gồm `astro check && astro build`);
- toàn bộ contextual internal links resolve;
- đủ 12 URL trong sitemap;
- ProjectNav còn hoạt động trên 12 trang;
- Lead Capture/contact signals không bị ảnh hưởng.

## P1 — Lead conversion — CONDITION BASED

### BL-LEAD-003 — Anti-spam foundation

Chỉ làm khi có spam thật. Ưu tiên honeypot/rate limiting/duplicate suppression; chỉ thêm Turnstile khi cần.

### BL-LEAD-012 — Lead operations

Chỉ kích hoạt khi có lead thật. Thiết kế workflow tối thiểu: lead mới, đã liên hệ, ghi chú, trạng thái. Không xây CRM lớn trong V1.

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

Kiểm tra production WebSite, Organization, BreadcrumbList; URL tuyệt đối và JSON-LD hợp lệ. Không blocking giai đoạn RUN & MEASURE nếu production không phát sinh lỗi.

### BL-SEO-032 — Project metadata

Mỗi subpage cần title/description/canonical/OG image/heading intent riêng. Chỉ ưu tiên tiếp khi Search Console hoặc SERP data cho thấy cần cải tiến.

### BL-SEO-033 — Image SEO

**Status: FOUNDATION DONE — 2026-09-08**

Đã thiết lập pipeline ảnh content chuẩn:
- WebP thật;
- cạnh dài tối đa 1200px;
- quality 78;
- không upscale;
- filename semantic;
- alt text thật;
- không giữ source/original trong `public`;
- script: `scripts/optimize-content-image.sh`;
- Pillow chạy trong `.venv-image`, không đụng Python system.

Tiếp tục áp dụng cho ảnh content mới khi vận hành.

## P1 — Homepage — MEASURE FIRST

### BL-HOME-040 — Featured Project Card Content

Project đã lấy động từ collection.

Ngày 2026-09-08 homepage đã nâng section bài viết từ 2 lên **4 bài mới nhất** và sort theo `publishedAt` chính xác, fallback về `pubDate`.

Còn lại: refine CTA, location/status, mobile conversion **chỉ khi dữ liệu thực tế cho thấy cần**.

## P1 — Content Engine — FOUNDATION DONE / OPERATIONS CONTINUE

### BL-CONTENT-050 — Posts collection foundation

**Status: DONE — 2026-09-08**

Đã hoàn thiện foundation:
- `src/content/posts/` hoạt động;
- schema mở rộng `updatedAt`, `publishedAt`, `contentType`, `searchIntent`, `projectSlug`;
- article detail editorial layout;
- cover image trong article;
- bullet/ordered-list typography;
- homepage routing đúng theo category;
- `PostRecommendations.astro` cho Related + Latest;
- related/latest smoke test với nhiều bài;
- homepage tự lấy bài mới nhất;
- build PASS.

### BL-CONTENT-053 — Project Editorial / Experience Cluster

**Status: PAUSED AS ACTIVE DEVELOPMENT — continue as content operations when useful**

Nguyên tắc:
- không copy sales post;
- không giả trải nghiệm;
- fact và cảm nhận phải tách biệt;
- pháp lý/giá/chính sách cần source + ngày cập nhật khi cần;
- ưu tiên ảnh thực địa, media semantic và internal linking;
- mỗi bài phải có search intent hoặc vai trò topical authority rõ.

#### Published/committed seed articles

1. `Bất động sản Bảo Lộc: 7 nhóm thông tin nên kiểm tra trước khi xuống tiền`
2. `Đất Bảo Lộc: 5 lỗi thường gặp khi chỉ nhìn giá rẻ`
3. `Mua đất Bảo Lộc nên kiểm tra pháp lý gì?`
4. `Bảo Lộc phù hợp để ở, nghỉ dưỡng hay đầu tư?`
5. `Phú Gia Bảo Lộc ở đâu? Cách nhìn vị trí đúng hơn quảng cáo`
6. `Phú Gia Bảo Lộc phù hợp với ai?`
7. `Những điều nên kiểm tra trước khi xem Phú Gia Bảo Lộc`

Bài #7 đã có cover thực địa + ảnh sơ đồ sản phẩm chen trong body.

#### Planned initial 10-post batch — không còn là NEXT code task

8. `Trải nghiệm Phú Gia Bảo Lộc: những điều đáng chú ý khi đến dự án` — chỉ publish khi đủ tư liệu thực tế.
9. `Cách đọc chính sách thanh toán dự án BĐS`
10. `Hạ tầng Bảo Lộc: phân biệt cái đã có và cái còn là kỳ vọng`

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

Tiếp tục nguyên tắc không hard-code Phú Gia Bảo Lộc trong reusable core. Không refactor chỉ vì mục tiêu “đẹp code” nếu chưa có project thứ hai cần dùng.

## P3 — Security / Hardening

### BL-SEC-080 — Supabase privileges review

Review least privilege, RLS và production secrets khi có lý do vận hành/security cụ thể.

### BL-SEC-081 — Dependency audit

Hiện npm báo 11 vulnerabilities (2 moderate, 9 high). Review theo exploitability và compatibility. Không chạy `npm audit fix --force`.

## DO NOT DO

- Không nâng Node tùy tiện.
- Không nâng macOS chỉ để chạy Cloudflare local.
- Không ép workerd chạy trên Big Sur.
- Không chuyển DEV static sang server chỉ để smoke-test.
- Không commit `.env` hoặc `.venv-image`.
- Không expose server secrets client-side.
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
2. production health;
3. traffic/search queries khi bắt đầu có dữ liệu;
4. lead thật và conversion signals.

Chỉ mở lại coding task khi một tín hiệu thực tế yêu cầu. Trọng tâm phát triển kỹ thuật chuyển sang **nhaHub**.
