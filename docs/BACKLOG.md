# BAO LOC BDS — BACKLOG

> Domain: `baolocbds.com`  
> Cập nhật: 2026-09-08

Priority: P0 = blocking, P1 = quan trọng, P2 = tăng trưởng, P3 = tối ưu sau.

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

Không xem đây là lỗi kỹ thuật ở thời điểm hiện tại; tiếp tục theo dõi crawl/indexing trong vài ngày tới.

## P1 — Lead conversion

### BL-LEAD-003 — Anti-spam foundation

Chỉ làm khi có spam thật. Ưu tiên honeypot/rate limiting/duplicate suppression; chỉ thêm Turnstile khi cần.

### BL-LEAD-012 — Lead operations

Sau khi có lead thật, thiết kế workflow tối thiểu: lead mới, đã liên hệ, ghi chú, trạng thái. Không xây CRM lớn trong V1.

## P1 — Phú Gia Bảo Lộc Content Upgrade

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

## P1 — SEO

### BL-SEO-031 — Validate structured data

Kiểm tra production WebSite, Organization, BreadcrumbList; URL tuyệt đối và JSON-LD hợp lệ.

### BL-SEO-032 — Project metadata

Mỗi subpage cần title/description/canonical/OG image/heading intent riêng.

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

Tiếp tục áp dụng cho toàn bộ ảnh content mới.

### BL-SEO-034 — Internal linking

Tạo topical graph: Homepage <-> Project <-> project subpages <-> market articles <-> finance articles <-> Bảo Lộc stories.

## P1 — Homepage

### BL-HOME-040 — Featured Project Card Content

Project đã lấy động từ collection.

Ngày 2026-09-08 homepage đã nâng section bài viết từ 2 lên **4 bài mới nhất** và sort theo `publishedAt` chính xác, fallback về `pubDate`.

Còn lại: refine CTA, location/status, mobile conversion nếu cần.

## P1 — Content Engine

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

**Status: IN PROGRESS**

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

#### Planned initial 10-post batch

8. `Trải nghiệm Phú Gia Bảo Lộc: những điều đáng chú ý khi đến dự án` — chỉ publish khi đủ tư liệu thực tế.
9. `Cách đọc chính sách thanh toán dự án BĐS`
10. `Hạ tầng Bảo Lộc: phân biệt cái đã có và cái còn là kỳ vọng`

### BL-CONTENT-051 — Thị trường Bảo Lộc

Content: hạ tầng, quy hoạch, khu vực, giá, giao dịch, quan sát thị trường, câu chuyện địa phương.

### BL-CONTENT-052 — Tài chính BĐS

Content: vay mua BĐS, dòng tiền, lịch thanh toán, cách đọc chính sách, chi phí sở hữu. Không đưa tư vấn tài chính thiếu căn cứ.

## P2 — Analytics

### BL-DATA-060 — Lead attribution

Sau khi có traffic, cân nhắc lưu `utm_source`, `utm_medium`, `utm_campaign`, `referrer`, `landing_page`.

### BL-DATA-061 — Conversion events

Theo dõi click Zalo, phone, open lead form, successful lead và project engagement.

## P2 — Architecture

### BL-ARCH-070 — Multi-project reusability

Tiếp tục nguyên tắc không hard-code Phú Gia Bảo Lộc trong reusable core.

## P3 — Security / Hardening

### BL-SEC-080 — Supabase privileges review

Review least privilege, RLS và production secrets sau Lead V1.

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

## NEXT

**BL-CONTENT-053 — Bài #8 trong editorial cluster.**

Trước khi viết bài trải nghiệm Phú Gia Bảo Lộc, rà lại bộ ảnh/video thực tế hiện có và chỉ dùng những chi tiết có bằng chứng trực quan hoặc ghi nhận thật. Nếu tư liệu chưa đủ để viết một bài experience đúng nghĩa, chuyển sang bài #9 `Cách đọc chính sách thanh toán dự án BĐS` thay vì giả trải nghiệm.
