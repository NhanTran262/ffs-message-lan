Cài Docker Desktop --> Open --> chạy lệnh: 'docker-compose up -d' để pull redis image
--> chạy lệnh: 'docker exec -it ffs-message-lan-source-redis-1 redis-cli ping' để kiểm tra server redis --> trả PONG là redis đã chạy

Note:

- 'docker exec -it ffs-message-lan-source-redis-1 redis-cli' --> truy cập vào redis
- các lệnh sử dụng trong redis-cli:
  - 'SELECT{DB trong redis -> bắt đầu từ 0} -> truy cập vào DB -> Ví dụ: 'SELECT 0', 'SELECT 1' ...
  - 'KEYS \*' -> kiểm tra các key đã được lưu vào redis
  - 'FLUSHALL' -> xóa toàn bộ các key trong tất cả DB của redis
  - 'FLUSHDB' -> chỉ xóa key trong DB đang truy cập
