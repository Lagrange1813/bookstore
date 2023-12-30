### Database

```sql
CREATE DATABASE bookstore
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### Users

```sql
USE bookstore;

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Name VARCHAR(100),
    Address TEXT,
    Email VARCHAR(100) UNIQUE,
    AccountBalance DECIMAL(10, 2) DEFAULT 0.00,
    CreditRating ENUM('1', '2', '3', '4', '5') DEFAULT '1',
);
```

## Book

### Books
- **BookID**: 唯一标识一本书的主键。
- **Title**: 书名。
- **Publisher**: 出版社。
- **Price**: 价格。
- **Keywords**: 关键字，可以使用分隔符来存储多个关键字或设计为单独的表。
- **StockQuantity**: 存货量。
- **SeriesID**: 如果这本书是丛书的一部分，这里可以是对应的丛书ID。

```sql
CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Publisher VARCHAR(100),
    Price DECIMAL(10, 2),
    Keywords VARCHAR(255),
    StockQuantity INT DEFAULT 0,
    SeriesID INT
);
```

### BookAuthors
- **BookAuthorID**: 唯一标识。
- **BookID**: 书籍ID，引用`Books`表。
- **AuthorID**: 作者ID，引用`Authors`表。
- **AuthorOrder**: 作者的排序顺序。

```sql
CREATE TABLE BookAuthors (
    BookAuthorID INT AUTO_INCREMENT PRIMARY KEY,
    BookID INT,
    AuthorID INT,
    AuthorOrder INT,
    FOREIGN KEY (BookID) REFERENCES Books(BookID),
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);
```

### BookSuppliers
- **BookSupplierID**: 唯一标识。
- **BookID**: 书籍ID，引用`Books`表。
- **SupplierID**: 供应商ID，引用`Suppliers`表。

```sql
CREATE TABLE BookSuppliers (
    BookSupplierID INT AUTO_INCREMENT PRIMARY KEY,
    BookID INT,
    SupplierID INT,
    FOREIGN KEY (BookID) REFERENCES Books(BookID),
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);
```

在这个设计中：
- `Books` 表负责存储每本书的基本信息。
- `BookAuthors` 表负责存储书籍和作者之间的多对多关系，并记录作者的顺序。
- `BookSuppliers` 表负责存储书籍和供应商之间的多对多关系。

请根据实际需求调整字段类型和大小，并在实施前考虑添加适当的索引来优化查询效率。在实际部署前，还应确保所有的外键引用都是正确的，并根据实际情况考虑是否需要级联更新或删除。

## Authors

- **AuthorID**: 唯一标识一个作者的主键。
- **FirstName**: 作者的名。
- **LastName**: 作者的姓。
- **Bio**: 作者的简短介绍或生平。

```sql
CREATE TABLE Authors (
    AuthorID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Bio TEXT
);
```

## Suppliers

- **SupplierID**: 唯一标识一个供应商的主键。
- **Name**: 供应商的名称。
- **Address**: 供应商的地址。

```sql
CREATE TABLE Suppliers (
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address TEXT
);
```

## Example

```sql
-- 向Authors表插入示例作者
INSERT INTO Authors (Name, Bio) VALUES
('J.K. Rowling', '英国作家，最著名的作品是哈利波特系列。'),
('George Orwell', '英国作家，著有动物农场和1984等反乌托邦小说。'),
('Leo Tolstoy', '俄罗斯作家，著有《战争与和平》和《安娜·卡列尼娜》。'),
('Agatha Christie', '英国侦探小说作家，以其惊险的故事和复杂的情节著称。');

-- 向Suppliers表插入示例供应商
INSERT INTO Suppliers (Name, Address) VALUES
('NewBooks Co', '1234 Paper Street, Booktown, BK1 2XY'),
('Quality Reads', '5678 Inkwell Avenue, Literatura, QR3 4ZW'),
('Epic Reads', '2468 Novel Road, Storyville, ER6 7YU'),
('LitSupply', '1357 Fiction Lane, Noveltown, LS8 9AD');

-- 向Books表插入示例图书
INSERT INTO Books (Title, Publisher, Price, Keywords, StockQuantity, SeriesID) VALUES
('Harry Potter and the Sorcerer\'s Stone', 'Bloomsbury', 19.99, 'Fantasy, Magic', 15, NULL),
('1984', 'Secker & Warburg', 14.99, 'Dystopian, Political', 10, NULL),
('War and Peace', 'The Russian Messenger', 24.99, 'Historical, Classic', 5, NULL),
('Murder on the Orient Express', 'Collins Crime Club', 15.99, 'Mystery, Crime', 12, NULL);

-- 建立书籍与作者的关系
-- 注意: 这里假设书籍和作者的ID分别为1-4，实际情况可能不同，您需要根据实际的ID进行调整
INSERT INTO BookAuthors (BookID, AuthorID, AuthorOrder) VALUES
(1, 1, 1),  -- J.K. Rowling 写的 "Harry Potter and the Sorcerer's Stone"
(2, 2, 1),  -- George Orwell 写的 "1984"
(3, 3, 1),  -- Leo Tolstoy 写的 "War and Peace"
(4, 4, 1);  -- Agatha Christie 写的 "Murder on the Orient Express"

-- 建立书籍与供应商的关系
-- 注意: 这里假设书籍和供应商的ID分别为1-4，实际情况可能不同，您需要根据实际的ID进行调整
INSERT INTO BookSuppliers (BookID, SupplierID) VALUES
(1, 1),  -- "Harry Potter and the Sorcerer's Stone" 由 NewBooks Co 供应
(2, 2),  -- "1984" 由 Quality Reads 供应
(3, 3),  -- "War and Peace" 由 Epic Reads 供应
(4, 4);  -- "Murder on the Orient Express" 由 LitSupply 供应
```

## Order

### Orders

- **OrderID**: 唯一标识一个订单的主键。
- **OrderDate**: 订单的日期。
- **CustomerID**: 下订单的客户ID，引用`Customers`表。
- **TotalAmount**: 订单的总金额。
- **ShippingAddress**: 发货地址。
- **ShippingStatus**: 发货情况，例如："未发货", "已发货", "已收货"等。

```sql
CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CustomerID INT,
    TotalAmount DECIMAL(10, 2),
    ShippingAddress TEXT,
    ShippingStatus ENUM('未发货', '已发货', '已收货') DEFAULT '未发货',
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
```

### OrderDetails

- **OrderDetailID**: 唯一标识订单中的一项的主键。
- **OrderID**: 订单的ID，引用`Orders`表。
- **BookID**: 订购的书籍ID，引用`Books`表。
- **Quantity**: 订购书籍的数量。
- **UnitPrice**: 书籍的单价。

```sql
CREATE TABLE OrderDetails (
    OrderDetailID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT,
    BookID INT,
    Quantity INT,
    UnitPrice DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);
```

