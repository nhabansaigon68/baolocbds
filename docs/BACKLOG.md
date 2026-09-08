# BAO LOC BDS — BACKLOG

> Domain: `baolocbds.com`  
> Cập nhật: 2026-09-08

Priority: P0 = blocking, P1 = quan trọng, P2 = tăng trưởng, P3 = tối ưu sau.

## DONE — Lead Capture Production Verification

### BL-LEAD-001 — Production E2E Lead Smoke Test

**Status: DONE — 2026-09-07**

Production flow đã PASS:

`baolocbds.com -> LeadCapture -> POST /api/leads -> Cloudflare Worker -> Supabase public.leads`

Test page: `/du-an/phu-gia-bao-loc/gia-ban/`

Verified: form submit, success UI, Supabase record, `intent = bang-gia`, source URL, E.164 phone normalization và Cloudflare deployment đều PASS.

Deployment checkpoint: Worker `baolocbds`, Version ID `4dad9cd1-77fb-4d93-a597-0e9d9b8436e4`.

Lead Capture V1 foundation chính thức DONE.

## DONE — SEO Foundation Registration

### BL-SEO-030 — Google Search Console

**Status: DONE — 2026-09-07**

- Domain Property `baolocbds.com` verified.
- Verification bằng DNS TXT tại Cloudflare.
- Không xóa TXT verification record.
- Sitemap `https://baolocbds.com/sitemap-index.xml` đã submit thành công.

Theo dõi tiếp theo là indexing/coverage/query khi Search Console bắt đầu có dữ liệu; đây là monitoring, không còn blocking setup.

## DONE — Lead conversion foundation

### BL-LEAD-010 — CTA intent mapping

**Status: DONE — 2026-09-08**

Đã chuyển project route từ điều kiện riêng cho `gia-ban` sang reusable `leadCaptureByPage` mapping theo `pageSlug`.

Mapping đang hoạt động:

- tổng quan -> `quan-tam-du-an`;
- giá bán -> `bang-gia`;
- chính sách -> `chinh-sach`;
- mặt bằng -> `mat-bang`.

Mỗi mapping có title và button label riêng. Không bắt khách chọn dropdown nếu intent có thể suy ra từ CTA/page.

Validation:

- `npm run build`: PASS;
- DEV static smoke-test Tổng quan: PASS;
- DEV static smoke-test Giá bán: PASS;
- DEV static smoke-test Chính sách: PASS;
- DEV static smoke-test Mặt bằng: PASS.

Commit: `d009b58` — `BL-LEAD-010: add reusable CTA intent mapping`.

Không nhét form vào mọi page. Các intent `san-pham`, `xem-du-an`, `tu-van-vay` chỉ bổ sung khi có CTA/use case thật.

## P1 — Lead conversion

### BL-LEAD-011 — CTA strategy

**Status: NEXT**

Rà soát hành trình visitor từ search/content -> CTA -> LeadCapture và ưu tiên CTA có ý định rõ, giá trị cao.

Các CTA ưu tiên:

- Nhận bảng giá & giỏ hàng mới nhất
- Nhận chính sách thanh toán
- Nhận mặt bằng
- Đăng ký xem dự án

Việc đầu tiên: rà soát CTA hiện tại trên project route/ProjectHero và thiết kế `Đăng ký xem dự án` với `intent = xem-du-an` mà không hard-code dữ liệu dự án vào reusable core.

Giữ form tối giản: phone required, name optional.

### BL-LEAD-002 — Error handling hardening

Sau khi intent mapping/CTA strategy ổn định: invalid phone -> 400; DB unavailable -> user-friendly error; chống double submit; loading state; mobile UX.

### BL-LEAD-003 — Anti-spam foundation

Chỉ làm khi có nhu cầu thực tế. Ưu tiên honeypot/rate limiting/duplicate suppression; chỉ thêm Turnstile khi spam xuất hiện. Không tăng friction sớm.

### BL-LEAD-012 — Lead operations

Sau khi bắt đầu có lead thật, thiết kế workflow tối thiểu: xem lead mới, thông báo, đã liên hệ, ghi chú, trạng thái. Chưa xây CRM lớn trong V1.

## P1 — Phú Gia Bảo Lộc Content Upgrade

### BL-PGBL-020 — Project Fact Sheet / Source of Truth

Chuẩn hóa fact sheet trước khi mở rộng content: tên pháp lý/thương mại, chủ đầu tư/pháp nhân, địa chỉ/toạ độ, diện tích, số lượng sản phẩm, QH 1/500, pháp lý, loại sản phẩm, tiến độ, chính sách, ngân hàng hỗ trợ.

Reconcile các số liệu khác nhau như 9.1 ha / 9.12 ha trước khi chuẩn hóa toàn site.

Ưu tiên nguồn: hồ sơ pháp lý -> tài liệu chủ đầu tư -> tài liệu phân phối chính thức -> ERA internal material -> nguồn web ngoài.

### BL-PGBL-021 — Tổng quan content pass

Bổ sung fact/USP hữu ích từ ERA và nguồn chính thức sau khi verify; không biến trang thành sales landing sáo rỗng.

### BL-PGBL-022 — Vị trí content pass

Phát triển cấu trúc kết nối 5 phút / 10 phút / liên vùng; bổ sung POI và thời gian di chuyển khi có nguồn đáng tin.

### BL-PGBL-023 — Pháp lý content pass

Ưu tiên quy hoạch, hồ sơ pháp lý, quyền sử dụng đất, xây dựng, thông tin sổ. Chỉ publish claim đã kiểm chứng.

### BL-PGBL-024 — Tiện ích content pass

Khai thác tiện ích nội khu, cảnh quan, trải nghiệm sống và bộ ảnh semantic hiện có.

### BL-PGBL-025 — Chính sách content pass

Khai thác tiến độ thanh toán, vay, ân hạn, ưu đãi khi còn hiệu lực. Nội dung có tính thời điểm phải có ngày cập nhật.

### BL-PGBL-026 — FAQ search intent

Xây FAQ từ câu hỏi khách thực sự tìm: vị trí, chủ đầu tư, pháp lý, sổ, giá, vay, diện tích, khoảng cách trung tâm, xây dựng, chính sách. Không nhồi keyword.

## P1 — SEO

### BL-SEO-031 — Validate structured data

Kiểm tra production WebSite, Organization, BreadcrumbList; URL tuyệt đối và JSON-LD hợp lệ.

### BL-SEO-032 — Project metadata

Mỗi subpage cần title/description/canonical/OG image/heading intent riêng; tránh metadata chung cho cả cluster.

### BL-SEO-033 — Image SEO

Semantic filename, alt text thật, dimensions, lazy loading phù hợp, WebP/AVIF nếu pipeline tương thích máy cũ.

### BL-SEO-034 — Internal linking

Tạo topical graph: Homepage <-> Project <-> project subpages <-> market articles <-> finance articles <-> Bảo Lộc stories.

## P1 — Homepage

### BL-HOME-040 — Featured Project Card Content

Project đã lấy động. Tiếp tục bổ sung summary, CTA, location/status, project hub link và mobile conversion.

## P2 — Content Engine

### BL-CONTENT-050 — Posts collection

Collection `posts` hiện trống. Tạo content thật thay dummy Test posts; xử lý build message ở `/tai-chinh/[slug]` và `/thi-truong/[slug]`.

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

Tiếp tục nguyên tắc không hard-code Phú Gia Bảo Lộc trong reusable core. ProjectHero, ProjectNav, LeadCapture và intent phải tái sử dụng được cho dự án khác.

## P3 — Security / Hardening

### BL-SEC-080 — Supabase privileges review

Sau Lead V1: review least privilege, RLS và production secrets; tuyệt đối không expose secret client-side.

### BL-SEC-081 — Dependency audit

Hiện npm báo 11 vulnerabilities (2 moderate, 9 high). Review từng dependency theo exploitability, production exposure, Node 20 và Big Sur compatibility. Không chạy `npm audit fix --force`.

## DO NOT DO

- Không nâng Node tùy tiện.
- Không nâng macOS chỉ để chạy Cloudflare local.
- Không ép workerd chạy trên Big Sur.
- Không chuyển DEV static sang server chỉ để smoke-test.
- Không commit `.env`.
- Không expose server secrets client-side.
- Không cho browser dùng server secret để ghi Supabase.
- Không chạy `npm audit fix --force`.
- Không hard-code Phú Gia Bảo Lộc vào reusable core.
- Không copy nguyên sales copy ERA.
- Không publish pháp lý/chính sách chưa kiểm chứng.

## NEXT

**BL-LEAD-011 — CTA strategy.**

Rà soát CTA hiện tại trên project route/ProjectHero; sau đó thiết kế `Đăng ký xem dự án` (`xem-du-an`) theo kiến trúc reusable, giữ form tối giản và không thêm form tràn lan.
