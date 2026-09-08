# BAO LOC BDS — SEO CONTROL CENTER

> Domain: `baolocbds.com`  
> Khởi tạo: 2026-09-08  
> Trạng thái: ACTIVE

## 1. Mục tiêu

SEO Control Center là điểm điều phối chiến lược SEO dài hạn của BAO LOC BDS.

Mục tiêu kinh doanh:

`Search demand -> Organic visibility -> Useful content -> Project discovery -> Lead`

Mục tiêu SEO theo thứ tự:

1. Xây authority cho entity **Phú Gia Bảo Lộc**.
2. Mở rộng topical authority sang **Bất động sản Bảo Lộc**.
3. Thu hút đúng search intent thay vì chạy theo traffic không liên quan.
4. Chuyển organic traffic thành lead với friction thấp.
5. Tạo tài sản nội dung có thể cập nhật và tích lũy giá trị nhiều năm.

Không cam kết thứ hạng cụ thể. Quyết định SEO dựa trên dữ liệu, search intent, chất lượng thông tin và kết quả đo thực tế.

## 2. Source of truth

Hệ thống SEO dùng ba lớp, mỗi lớp có một vai trò riêng.

### Google Search Console — Google thực sự thấy gì?

Dùng để theo dõi:

- discovery và indexing;
- search queries;
- impressions;
- clicks;
- CTR;
- average position;
- URL performance;
- các vấn đề Search Console báo cáo.

Search Console là nguồn ưu tiên cho performance trên Google Search, không thay bằng phỏng đoán từ công cụ SEO.

### Airtable — SEO đang vận hành ra sao?

Dùng cho dữ liệu dạng bảng và thay đổi thường xuyên, ví dụ:

- keyword inventory;
- search intent;
- target URL;
- SERP observations;
- content status;
- ranking snapshots;
- SEO tasks và operational notes.

Không đưa toàn bộ dữ liệu vận hành thay đổi liên tục vào Markdown/Git.

### GitHub — Ta đã quyết định làm gì và tại sao?

Repo `nhabansaigon68/baolocbds` là source of truth cho:

- SEO strategy;
- SEO architecture;
- entity/content architecture;
- technical SEO standards;
- content standards;
- durable SERP intelligence;
- các quyết định SEO quan trọng;
- implementation code và lịch sử commit.

Không tạo repo SEO riêng ở giai đoạn hiện tại.

## 3. Nguyên tắc SEO

### Search intent first

Không bắt đầu bằng việc nhồi keyword. Trước tiên xác định người tìm đang muốn biết hoặc làm gì.

### Fact first

Đặc biệt với BĐS, pháp lý, giá, chính sách và tiến độ:

- ưu tiên nguồn gốc;
- ghi ngày cập nhật khi dữ liệu có tính thời điểm;
- phân biệt fact với sales claim;
- không biến ngôn ngữ quảng cáo thành sự thật;
- không publish claim quan trọng chưa kiểm chứng.

### Information gain

Không tạo phiên bản thứ N của cùng một bài đang có trên Internet.

Ưu tiên giá trị BAO LOC BDS có thể bổ sung:

- tài liệu nguồn;
- dữ liệu có cấu trúc;
- ảnh thực địa;
- timeline;
- giá/chính sách theo thời điểm;
- kiểm chứng;
- câu hỏi khách hàng thật;
- quan sát địa phương;
- lịch sử cập nhật.

### Topical authority, không content spam

Ưu tiên một cluster nhỏ nhưng sâu, liên kết tốt và hữu ích hơn hàng trăm bài mỏng.

### One intent — one canonical destination

Tránh tạo nhiều URL cạnh tranh cùng một search intent chỉ để bắt biến thể keyword.

### Internal linking có chủ đích

Internal link phải giúp người đọc và crawler hiểu quan hệ giữa:

`Homepage <-> Bảo Lộc <-> Project Hub <-> Project Subpages <-> Market/Story Content`

### Freshness phải là thật

Không tự động đổi tháng/năm để giả nội dung mới. Chỉ cập nhật `updatedAt` hoặc nhãn cập nhật khi nội dung/dữ liệu thực sự thay đổi.

### SEO phải dẫn đến conversion

Traffic không phải mục tiêu cuối. Organic content cần có đường đi hợp lý tới project discovery và CTA/lead mà không làm giảm trải nghiệm đọc.

## 4. Phú Gia Bảo Lộc — cluster đầu tiên

Project hub hiện tại:

`/du-an/phu-gia-bao-loc/`

Các subpage hiện có:

- vị trí;
- quy hoạch;
- pháp lý;
- tiến độ;
- mặt bằng;
- tiện ích;
- sản phẩm;
- giá bán;
- chính sách;
- thư viện ảnh;
- FAQ.

Không thay đổi URL architecture chỉ vì một vòng keyword research. Mọi thay đổi route phải có bằng chứng search intent/architecture đủ mạnh và đánh giá redirect/canonical trước.

## 5. SERP benchmark

### Benchmark #1 — `phugia-baoloc.vn`

Lý do theo dõi: được quan sát ở vị trí rất cao/Top 1 cho truy vấn `phu gia bao loc` tại thời điểm khảo sát của người vận hành.

Mục tiêu benchmark không phải copy đối thủ.

Cần học:

- cách họ đáp ứng broad project intent;
- title/H1/heading coverage;
- project information coverage;
- commercial intent coverage: giá, pháp lý, chính sách, sản phẩm;
- FAQ;
- conversion architecture;
- content cluster;
- internal links;
- technical/structured-data signals có thể xác minh.

Nguyên tắc:

`Benchmark -> Learn strengths -> Verify with SERP/data -> Add BAO LOC BDS information gain`

Không coi một snapshot ranking là thứ hạng cố định. SERP có thể thay đổi theo thời gian, vị trí, thiết bị và ngữ cảnh tìm kiếm.

## 6. SEO intelligence workflow

Mỗi vòng nghiên cứu nên đi theo chu trình:

1. Chọn query/search intent.
2. Quan sát SERP hiện tại.
3. Ghi nhận các kết quả mạnh.
4. Phân tích điểm chung và khác biệt.
5. Xác định information gap.
6. Map intent -> URL hiện có hoặc URL đề xuất.
7. Quyết định: CREATE / UPDATE / MERGE / NO ACTION.
8. Implement theo workflow dự án.
9. Submit/discover/index khi cần.
10. Đo Search Console.
11. Cải thiện dựa trên dữ liệu.

## 7. Tài liệu SEO sẽ tạo khi cần

Không tạo file rỗng chỉ để đủ cấu trúc. Các tài liệu dưới đây được tạo dần khi có nội dung thực tế:

- `SERP-INTELLIGENCE.md` — durable competitor/SERP findings.
- `KEYWORD-MAP.md` — keyword/search-intent map đã được chắt lọc; dữ liệu lớn nằm ở Airtable.
- `ENTITY-MAP.md` — entity và quan hệ cần thể hiện nhất quán.
- `SEO-ARCHITECTURE.md` — search/content architecture đã freeze.
- `CONTENT-STANDARD.md` — chuẩn viết, nguồn, freshness, media, CTA.
- `TECHNICAL-SEO.md` — technical SEO contract.
- `DECISIONS.md` — các quyết định SEO có ảnh hưởng dài hạn.

## 8. Quan hệ với BACKLOG dự án

SEO không có backlog riêng.

`docs/BACKLOG.md` tiếp tục là backlog duy nhất của BAO LOC BDS.

SEO tasks được ghi vào BACKLOG chung bằng prefix `BL-SEO-*`, `BL-PGBL-*` hoặc nhóm phù hợp với bản chất công việc.

Không tự ý thay NEXT checkpoint đang hoạt động chỉ vì mở một workstream nghiên cứu SEO mới.

Tại thời điểm khởi tạo SEO Control Center, NEXT của dự án vẫn do `docs/BACKLOG.md` quyết định.

## 9. Workflow thực thi

Giữ nguyên nguyên tắc dự án:

`DESIGN -> FREEZE -> CODE -> TEST -> COMMIT`

Với SEO/content:

`RESEARCH -> INTENT MAP -> DESIGN -> FREEZE -> CREATE/UPDATE -> VERIFY -> PUBLISH -> MEASURE -> IMPROVE`

Không hard-code Phú Gia Bảo Lộc vào reusable core.

## 10. Definition of success

Không đánh giá SEO bằng số lượng bài đã đăng.

Theo dõi funnel:

`Indexed URLs -> Impressions -> Queries -> Positions -> Clicks -> Engagement -> CTA -> Leads`

Một URL tốt có thể được cập nhật và cải thiện nhiều lần thay vì liên tục tạo URL mới.
