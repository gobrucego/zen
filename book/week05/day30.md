# 第30天：RESTful API设计

> "好的API设计就像好的用户界面，让使用者感到直观和愉悦！"

## 📚 今日目标

- 理解REST架构风格
- 掌握RESTful API设计原则
- 学习HTTP方法的正确使用
- 理解资源和URI设计
- 掌握API版本控制和错误处理
- 实现一个简单的RESTful API

---

## 1. REST基础概念

### 1.1 什么是REST？

```
REST (Representational State Transfer)
表述性状态转移

核心思想：
- 资源（Resource）为中心
- 使用标准HTTP方法
- 无状态通信
- 统一接口

REST不是协议，而是一种架构风格

类比：
REST API = 图书馆管理系统
- 资源 = 书籍
- URI = 书籍编号
- HTTP方法 = 操作（借、还、查、删）
- 状态码 = 操作结果（成功、失败、未找到）

例如：
GET /books/123        → 查询123号书
POST /books           → 新增一本书
PUT /books/123        → 更新123号书
DELETE /books/123     → 删除123号书
```

### 1.2 REST的六大约束

```
1. 客户端-服务器分离 (Client-Server)
   - 客户端和服务器独立演化
   - 前后端分离

2. 无状态 (Stateless)
   - 每个请求包含所有必要信息
   - 服务器不保存客户端状态
   - 易于扩展和负载均衡

3. 可缓存 (Cacheable)
   - 响应可以被缓存
   - 提高性能

4. 分层系统 (Layered System)
   - 客户端不知道直接连接的是服务器还是中间层
   - 可以加入负载均衡、缓存等

5. 统一接口 (Uniform Interface)
   - 资源标识（URI）
   - 通过表述操作资源
   - 自描述消息
   - 超媒体驱动（HATEOAS）

6. 按需代码（可选）(Code on Demand)
   - 服务器可以返回可执行代码
   - 如JavaScript
```

---

## 2. RESTful API设计原则

### 2.1 资源和URI设计

```
资源设计原则：

1. 使用名词，不使用动词
   ✅ 好的设计:
   GET  /users          # 获取用户列表
   GET  /users/123      # 获取ID为123的用户
   POST /users          # 创建新用户

   ❌ 不好的设计:
   GET  /getUsers
   POST /createUser
   GET  /user/delete/123

2. 使用复数形式
   ✅ 好: /users, /products, /orders
   ❌ 差: /user, /product, /order

3. 使用小写字母和连字符
   ✅ 好: /user-profiles, /product-categories
   ❌ 差: /UserProfiles, /product_categories

4. 资源嵌套表示关系
   ✅ 好: /users/123/orders        # 用户123的订单
        /orders/456/items        # 订单456的商品

   但不要嵌套太深（最多2-3层）
   ❌ 差: /users/123/orders/456/items/789/reviews

5. 使用查询参数进行过滤、排序、分页
   /users?role=admin              # 过滤
   /users?sort=created_at&order=desc  # 排序
   /users?page=2&limit=20         # 分页
   /users?fields=id,name,email    # 字段选择
```

### 2.2 HTTP方法使用

```
标准HTTP方法及其用途：

┌────────┬──────────┬─────────┬─────────┬──────────┐
│ 方法   │ 用途     │ 安全性  │ 幂等性  │ 可缓存   │
├────────┼──────────┼─────────┼─────────┼──────────┤
│ GET    │ 获取资源 │ 是      │ 是      │ 是       │
│ POST   │ 创建资源 │ 否      │ 否      │ 否       │
│ PUT    │ 更新资源 │ 否      │ 是      │ 否       │
│ PATCH  │ 部分更新 │ 否      │ 否      │ 否       │
│ DELETE │ 删除资源 │ 否      │ 是      │ 否       │
│ HEAD   │ 获取头部 │ 是      │ 是      │ 是       │
│ OPTIONS│ 获取选项 │ 是      │ 是      │ 否       │
└────────┴──────────┴─────────┴─────────┴──────────┘

详细说明：

GET - 获取资源
  GET /users           → 获取所有用户
  GET /users/123       → 获取ID为123的用户
  特点：安全、幂等、可缓存

POST - 创建新资源
  POST /users
  Body: {"name": "张三", "email": "zhang@example.com"}
  特点：不安全、不幂等

PUT - 完整更新资源
  PUT /users/123
  Body: {"name": "张三", "email": "new@example.com", "age": 30}
  特点：幂等（多次执行结果相同）
  要求：必须提供完整的资源数据

PATCH - 部分更新资源
  PATCH /users/123
  Body: {"email": "new@example.com"}
  特点：只更新提供的字段
  更灵活，推荐使用

DELETE - 删除资源
  DELETE /users/123
  特点：幂等（删除多次结果相同）

HEAD - 获取资源元数据
  HEAD /users/123
  返回：只返回响应头，不返回响应体
  用途：检查资源是否存在、获取资源大小等

OPTIONS - 获取资源支持的方法
  OPTIONS /users
  返回：Allow: GET, POST, PUT, DELETE
  用途：CORS预检请求
```

### 2.3 状态码使用

```
HTTP状态码分类：

1xx - 信息性
  100 Continue              # 继续请求

2xx - 成功
  200 OK                    # 成功（GET, PUT, PATCH）
  201 Created               # 创建成功（POST）
  202 Accepted              # 已接受，处理中（异步操作）
  204 No Content            # 成功，无返回内容（DELETE）

3xx - 重定向
  301 Moved Permanently     # 永久重定向
  302 Found                 # 临时重定向
  304 Not Modified          # 未修改（缓存有效）

4xx - 客户端错误
  400 Bad Request           # 请求参数错误
  401 Unauthorized          # 未认证
  403 Forbidden             # 无权限
  404 Not Found             # 资源不存在
  405 Method Not Allowed    # 方法不允许
  409 Conflict              # 资源冲突
  422 Unprocessable Entity  # 验证失败
  429 Too Many Requests     # 请求过多

5xx - 服务器错误
  500 Internal Server Error # 服务器内部错误
  502 Bad Gateway           # 网关错误
  503 Service Unavailable   # 服务不可用
  504 Gateway Timeout       # 网关超时

最常用的状态码：
┌──────────────────┬─────────────────────────┐
│ 操作             │ 状态码                   │
├──────────────────┼─────────────────────────┤
│ GET成功          │ 200 OK                  │
│ POST创建成功     │ 201 Created             │
│ PUT/PATCH成功    │ 200 OK                  │
│ DELETE成功       │ 204 No Content          │
│ 参数错误         │ 400 Bad Request         │
│ 未登录           │ 401 Unauthorized        │
│ 无权限           │ 403 Forbidden           │
│ 资源不存在       │ 404 Not Found           │
│ 验证失败         │ 422 Unprocessable Entity│
│ 服务器错误       │ 500 Internal Server Error│
└──────────────────┴─────────────────────────┘
```

### 2.4 响应数据格式

```
标准JSON响应格式：

成功响应：
{
  "status": "success",
  "data": {
    "id": 123,
    "name": "张三",
    "email": "zhang@example.com"
  },
  "message": "操作成功"
}

列表响应（带分页）：
{
  "status": "success",
  "data": [
    {"id": 1, "name": "张三"},
    {"id": 2, "name": "李四"}
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  },
  "message": "获取成功"
}

错误响应：
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "验证失败",
    "details": [
      {
        "field": "email",
        "message": "邮箱格式不正确"
      },
      {
        "field": "password",
        "message": "密码长度至少8位"
      }
    ]
  }
}

统一字段说明：
- status: 状态（success/error）
- data: 数据内容
- message: 提示信息
- error: 错误详情
- pagination: 分页信息
```

---

## 3. 高级特性

### 3.1 版本控制

```
API版本控制的三种方式：

1. URI版本控制（推荐）
   https://api.example.com/v1/users
   https://api.example.com/v2/users

   优点：清晰、直观
   缺点：URI变化

2. 请求头版本控制
   GET /users
   Headers:
     Accept: application/vnd.example.v1+json

   优点：URI不变
   缺点：不够直观

3. 参数版本控制
   GET /users?version=1

   优点：简单
   缺点：容易忽略，不够规范

推荐做法：
- 使用URI版本控制
- 主版本号（v1, v2）
- 保持向后兼容
- 明确废弃策略
```

### 3.2 分页、过滤、排序

```
分页参数：
GET /users?page=2&limit=20

或使用offset和limit：
GET /users?offset=20&limit=20

响应包含分页信息：
{
  "data": [...],
  "pagination": {
    "total": 1000,      # 总记录数
    "page": 2,          # 当前页
    "limit": 20,        # 每页数量
    "pages": 50,        # 总页数
    "prev": 1,          # 上一页
    "next": 3           # 下一页
  }
}

---

过滤参数：
GET /users?role=admin&status=active
GET /products?category=electronics&price_min=100&price_max=1000
GET /orders?created_after=2024-01-01&created_before=2024-12-31

---

排序参数：
GET /users?sort=created_at&order=desc
GET /products?sort=-price  # 减号表示降序
GET /users?sort=name,created_at  # 多字段排序

---

字段选择（稀疏字段集）：
GET /users?fields=id,name,email
只返回指定的字段，减少数据传输

---

搜索：
GET /users?search=张三
GET /products?q=手机
```

### 3.3 认证和授权

```
常见认证方式：

1. Basic Auth（基础认证）
   Authorization: Basic base64(username:password)

   优点：简单
   缺点：不够安全（需HTTPS）

2. API Key
   GET /users?api_key=your_api_key
   或
   Headers: X-API-Key: your_api_key

   优点：简单、易于管理
   缺点：密钥泄露风险

3. JWT (JSON Web Token)（推荐）
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   优点：无状态、可扩展、信息丰富
   缺点：令牌较大

4. OAuth 2.0
   用于第三方授权

   流程：
   1. 客户端请求授权
   2. 用户同意授权
   3. 获取访问令牌
   4. 使用令牌访问资源

JWT结构：
Header.Payload.Signature

{
  "alg": "HS256",        # 算法
  "typ": "JWT"           # 类型
}
.
{
  "sub": "123",          # 用户ID
  "name": "张三",
  "iat": 1516239022,     # 签发时间
  "exp": 1516242622      # 过期时间
}
.
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

### 3.4 HATEOAS

```
HATEOAS (Hypermedia as the Engine of Application State)
超媒体驱动的应用状态

原则：
API响应中包含相关操作的链接

示例：
GET /users/123

响应：
{
  "id": 123,
  "name": "张三",
  "email": "zhang@example.com",
  "links": [
    {
      "rel": "self",
      "href": "/users/123",
      "method": "GET"
    },
    {
      "rel": "update",
      "href": "/users/123",
      "method": "PUT"
    },
    {
      "rel": "delete",
      "href": "/users/123",
      "method": "DELETE"
    },
    {
      "rel": "orders",
      "href": "/users/123/orders",
      "method": "GET"
    }
  ]
}

优点：
- API自解释
- 客户端不需要硬编码URL
- 易于演化

缺点：
- 增加响应大小
- 实现复杂
```

---

## 4. 实战项目：用户管理API

### 4.1 API设计

```
用户管理API设计：

资源：Users（用户）

端点设计：
┌────────┬─────────────────┬──────────────────┬─────────┐
│ 方法   │ URI             │ 描述             │ 状态码  │
├────────┼─────────────────┼──────────────────┼─────────┤
│ GET    │ /api/v1/users   │ 获取用户列表     │ 200     │
│ GET    │ /api/v1/users/1 │ 获取指定用户     │ 200/404 │
│ POST   │ /api/v1/users   │ 创建新用户       │ 201     │
│ PUT    │ /api/v1/users/1 │ 更新用户（完整） │ 200/404 │
│ PATCH  │ /api/v1/users/1 │ 更新用户（部分） │ 200/404 │
│ DELETE │ /api/v1/users/1 │ 删除用户         │ 204/404 │
└────────┴─────────────────┴──────────────────┴─────────┘

查询参数：
- ?page=1&limit=20    # 分页
- ?role=admin         # 按角色过滤
- ?search=张          # 搜索
- ?sort=created_at    # 排序
```

### 4.2 代码实现

```python
# day30_restful_api.py
# 功能：简单的RESTful API实现

from flask import Flask, request, jsonify
from datetime import datetime
import uuid

app = Flask(__name__)

# 模拟数据库
users_db = {}

# 初始化一些测试数据
def init_data():
    """初始化测试数据"""
    users = [
        {"name": "张三", "email": "zhang@example.com", "role": "admin"},
        {"name": "李四", "email": "li@example.com", "role": "user"},
        {"name": "王五", "email": "wang@example.com", "role": "user"},
    ]

    for user_data in users:
        user_id = str(uuid.uuid4())
        users_db[user_id] = {
            "id": user_id,
            **user_data,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }

init_data()


def success_response(data=None, message="操作成功", status_code=200):
    """
    成功响应格式

    参数：
        data: 返回的数据
        message: 提示信息
        status_code: HTTP状态码
    """
    response = {
        "status": "success",
        "message": message
    }

    if data is not None:
        response["data"] = data

    return jsonify(response), status_code


def error_response(message="操作失败", code="ERROR", details=None, status_code=400):
    """
    错误响应格式

    参数：
        message: 错误信息
        code: 错误代码
        details: 错误详情
        status_code: HTTP状态码
    """
    response = {
        "status": "error",
        "error": {
            "code": code,
            "message": message
        }
    }

    if details:
        response["error"]["details"] = details

    return jsonify(response), status_code


# ============================================================
# 用户管理API
# ============================================================

@app.route('/api/v1/users', methods=['GET'])
def get_users():
    """
    获取用户列表

    查询参数：
        page: 页码（默认1）
        limit: 每页数量（默认20）
        role: 角色过滤
        search: 搜索（姓名或邮箱）
        sort: 排序字段
        order: 排序顺序（asc/desc）
    """
    # 获取查询参数
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    role = request.args.get('role')
    search = request.args.get('search')
    sort_field = request.args.get('sort', 'created_at')
    sort_order = request.args.get('order', 'desc')

    # 获取所有用户
    users_list = list(users_db.values())

    # 过滤
    if role:
        users_list = [u for u in users_list if u.get('role') == role]

    if search:
        users_list = [
            u for u in users_list
            if search.lower() in u.get('name', '').lower()
            or search.lower() in u.get('email', '').lower()
        ]

    # 排序
    reverse = (sort_order == 'desc')
    users_list.sort(key=lambda x: x.get(sort_field, ''), reverse=reverse)

    # 分页
    total = len(users_list)
    start = (page - 1) * limit
    end = start + limit
    users_page = users_list[start:end]

    # 构造响应
    response_data = {
        "users": users_page,
        "pagination": {
            "total": total,
            "page": page,
            "limit": limit,
            "pages": (total + limit - 1) // limit
        }
    }

    return success_response(response_data, "获取用户列表成功")


@app.route('/api/v1/users/<user_id>', methods=['GET'])
def get_user(user_id):
    """
    获取指定用户

    路径参数：
        user_id: 用户ID
    """
    user = users_db.get(user_id)

    if not user:
        return error_response(
            message=f"用户不存在",
            code="USER_NOT_FOUND",
            status_code=404
        )

    return success_response(user, "获取用户成功")


@app.route('/api/v1/users', methods=['POST'])
def create_user():
    """
    创建新用户

    请求体：
        {
            "name": "用户名",
            "email": "邮箱",
            "role": "角色"
        }
    """
    data = request.get_json()

    # 验证必填字段
    required_fields = ['name', 'email']
    missing_fields = [f for f in required_fields if f not in data]

    if missing_fields:
        return error_response(
            message="缺少必填字段",
            code="VALIDATION_ERROR",
            details=[{"field": f, "message": "此字段为必填项"} for f in missing_fields],
            status_code=422
        )

    # 验证邮箱唯一性
    email = data.get('email')
    if any(u['email'] == email for u in users_db.values()):
        return error_response(
            message="邮箱已存在",
            code="EMAIL_EXISTS",
            status_code=409
        )

    # 创建用户
    user_id = str(uuid.uuid4())
    user = {
        "id": user_id,
        "name": data['name'],
        "email": data['email'],
        "role": data.get('role', 'user'),
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }

    users_db[user_id] = user

    return success_response(user, "创建用户成功", 201)


@app.route('/api/v1/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    """
    完整更新用户

    路径参数：
        user_id: 用户ID

    请求体：
        {
            "name": "用户名",
            "email": "邮箱",
            "role": "角色"
        }
    """
    if user_id not in users_db:
        return error_response(
            message="用户不存在",
            code="USER_NOT_FOUND",
            status_code=404
        )

    data = request.get_json()

    # 验证必填字段
    required_fields = ['name', 'email']
    missing_fields = [f for f in required_fields if f not in data]

    if missing_fields:
        return error_response(
            message="缺少必填字段",
            code="VALIDATION_ERROR",
            details=[{"field": f, "message": "此字段为必填项"} for f in missing_fields],
            status_code=422
        )

    # 更新用户
    users_db[user_id].update({
        "name": data['name'],
        "email": data['email'],
        "role": data.get('role', 'user'),
        "updated_at": datetime.now().isoformat()
    })

    return success_response(users_db[user_id], "更新用户成功")


@app.route('/api/v1/users/<user_id>', methods=['PATCH'])
def patch_user(user_id):
    """
    部分更新用户

    路径参数：
        user_id: 用户ID

    请求体：可以只包含要更新的字段
        {
            "name": "新用户名"
        }
    """
    if user_id not in users_db:
        return error_response(
            message="用户不存在",
            code="USER_NOT_FOUND",
            status_code=404
        )

    data = request.get_json()

    # 只更新提供的字段
    allowed_fields = ['name', 'email', 'role']
    for field in allowed_fields:
        if field in data:
            users_db[user_id][field] = data[field]

    users_db[user_id]['updated_at'] = datetime.now().isoformat()

    return success_response(users_db[user_id], "更新用户成功")


@app.route('/api/v1/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    """
    删除用户

    路径参数：
        user_id: 用户ID
    """
    if user_id not in users_db:
        return error_response(
            message="用户不存在",
            code="USER_NOT_FOUND",
            status_code=404
        )

    del users_db[user_id]

    # DELETE成功通常返回204 No Content
    return '', 204


# ============================================================
# API文档和健康检查
# ============================================================

@app.route('/api/v1/health', methods=['GET'])
def health_check():
    """健康检查"""
    return success_response({
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    })


@app.route('/api/v1/docs', methods=['GET'])
def api_docs():
    """API文档"""
    docs = {
        "version": "1.0.0",
        "title": "用户管理API",
        "endpoints": [
            {
                "path": "/api/v1/users",
                "method": "GET",
                "description": "获取用户列表",
                "parameters": {
                    "page": "页码",
                    "limit": "每页数量",
                    "role": "角色过滤",
                    "search": "搜索",
                    "sort": "排序字段",
                    "order": "排序顺序"
                }
            },
            {
                "path": "/api/v1/users/<id>",
                "method": "GET",
                "description": "获取指定用户"
            },
            {
                "path": "/api/v1/users",
                "method": "POST",
                "description": "创建新用户",
                "body": {
                    "name": "用户名（必填）",
                    "email": "邮箱（必填）",
                    "role": "角色（可选）"
                }
            },
            {
                "path": "/api/v1/users/<id>",
                "method": "PUT",
                "description": "完整更新用户"
            },
            {
                "path": "/api/v1/users/<id>",
                "method": "PATCH",
                "description": "部分更新用户"
            },
            {
                "path": "/api/v1/users/<id>",
                "method": "DELETE",
                "description": "删除用户"
            }
        ]
    }

    return success_response(docs)


if __name__ == '__main__':
    print("""
    ╔══════════════════════════════════════════════════════════╗
    ║       RESTful API 服务器                                  ║
    ║       User Management API                                ║
    ╚══════════════════════════════════════════════════════════╝

    API地址: http://127.0.0.1:5000/api/v1

    可用端点:
    - GET    /api/v1/users          获取用户列表
    - GET    /api/v1/users/<id>     获取指定用户
    - POST   /api/v1/users          创建新用户
    - PUT    /api/v1/users/<id>     更新用户（完整）
    - PATCH  /api/v1/users/<id>     更新用户（部分）
    - DELETE /api/v1/users/<id>     删除用户
    - GET    /api/v1/health         健康检查
    - GET    /api/v1/docs           API文档

    测试命令:
    # 获取所有用户
    curl http://127.0.0.1:5000/api/v1/users

    # 创建用户
    curl -X POST http://127.0.0.1:5000/api/v1/users \\
      -H "Content-Type: application/json" \\
      -d '{"name":"测试用户","email":"test@example.com"}'

    # 获取单个用户
    curl http://127.0.0.1:5000/api/v1/users/<user_id>

    # 更新用户
    curl -X PATCH http://127.0.0.1:5000/api/v1/users/<user_id> \\
      -H "Content-Type: application/json" \\
      -d '{"name":"新名字"}'

    # 删除用户
    curl -X DELETE http://127.0.0.1:5000/api/v1/users/<user_id>
    """)

    app.run(debug=True, host='0.0.0.0', port=5000)
```

---

## 5. API测试

### 5.1 使用curl测试

```bash
# 1. 获取所有用户
curl http://127.0.0.1:5000/api/v1/users

# 2. 分页和过滤
curl "http://127.0.0.1:5000/api/v1/users?page=1&limit=10&role=admin"

# 3. 创建用户
curl -X POST http://127.0.0.1:5000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "新用户",
    "email": "new@example.com",
    "role": "user"
  }'

# 4. 获取单个用户
curl http://127.0.0.1:5000/api/v1/users/<user_id>

# 5. 更新用户（PUT - 完整更新）
curl -X PUT http://127.0.0.1:5000/api/v1/users/<user_id> \
  -H "Content-Type: application/json" \
  -d '{
    "name": "更新的用户",
    "email": "updated@example.com",
    "role": "admin"
  }'

# 6. 更新用户（PATCH - 部分更新）
curl -X PATCH http://127.0.0.1:5000/api/v1/users/<user_id> \
  -H "Content-Type: application/json" \
  -d '{"name": "只更新名字"}'

# 7. 删除用户
curl -X DELETE http://127.0.0.1:5000/api/v1/users/<user_id>

# 8. 健康检查
curl http://127.0.0.1:5000/api/v1/health
```

---

## 6. 最佳实践总结

```
RESTful API设计最佳实践：

1. 使用名词表示资源，用HTTP方法表示操作
   ✅ GET /users
   ❌ GET /getUsers

2. 使用复数形式
   ✅ /users, /products
   ❌ /user, /product

3. 使用正确的HTTP状态码
   200: 成功
   201: 创建成功
   204: 删除成功
   400: 请求错误
   401: 未认证
   403: 无权限
   404: 未找到
   500: 服务器错误

4. 提供版本控制
   /api/v1/users

5. 支持分页、过滤、排序
   ?page=1&limit=20&sort=name

6. 使用统一的响应格式
   {
     "status": "success",
     "data": {...}
   }

7. 提供清晰的错误信息
   {
     "status": "error",
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "详细错误信息"
     }
   }

8. 使用HTTPS保护API
9. 实现认证和授权（JWT推荐）
10. 提供完善的API文档
11. 实现请求限流（Rate Limiting）
12. 使用缓存提高性能
13. 记录完整的日志
14. 编写完善的测试
```

---

## 7. 今日练习

### 练习1：设计博客API
设计一个博客系统的RESTful API，包含：
- 文章（articles）
- 评论（comments）
- 标签（tags）

要求：
1. 设计合理的URI
2. 选择正确的HTTP方法
3. 考虑资源之间的关系

### 练习2：实现产品API
扩展示例代码，实现产品管理API：
- 产品CRUD操作
- 分类过滤
- 价格区间查询
- 库存管理

### 练习3：API测试
使用Postman或curl测试今天的用户管理API：
1. 测试所有端点
2. 测试边界情况
3. 测试错误处理

---

## 8. 扩展阅读

- REST架构论文（Roy Fielding）
- HTTP/1.1规范（RFC 7231-7235）
- JSON API规范
- OpenAPI/Swagger文档规范

---

**进度：30/120天（25.0%）**

恭喜完成第30天学习！你已经掌握了RESTful API设计的核心原则。明天我们将学习WebSocket实时通信！
