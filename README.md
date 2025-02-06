# 🎟️ **Event Ticket Booking System API**

Welcome to the **Event Ticket Booking System API**! This RESTful API enables event organizers to manage ticket bookings, cancellations, waiting lists, and more.

---

## 🚀 **Features**

- **Initialize events** with a set number of tickets.
- **Book tickets concurrently** and manage waiting lists.
- **Handle cancellations** and automatically assign tickets to waiting list users.
- **API rate limiting** to prevent abuse.
- **Basic authentication** for sensitive operations.
- **Structured logging** to track all operations.

---

## 🛠️ **Setup and Running Instructions**

### Prerequisites

Ensure that you have the following installed on your system:

- [Node.js (v14+)](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/elishaakande/event-booking-api.git
cd event-booking-api
npm install
```

### Environment Variables

Create a .env file in the root directory and add:

```bash
DB_URL=mongodb+srv://[username:password@]host
DB=YOUR_DB_NAME
API_KEY=your_secure_api_key
```

### Run the Server

To start the server:

```bash
npm start
```

## 🌐 API Documentation

### Authentication

Use the API_KEY you used in .env in the request header for authentication purpose (only users with the API_KEY can access data).

```bash
x-api-key: your_secure_api_key
```

### Available Endpoints

| **Method** | **Endpoint**                  | **Description**                                                       | **Auth Required** |
| ---------- | ----------------------------- | --------------------------------------------------------------------- | ----------------- |
| **POST**   | `/api/events/initialize`      | Initialize an event with a set number of tickets.                     | ✅                |
| **POST**   | `/api/events/book`            | Book a ticket for a user, or add to waiting list.                     | ❌                |
| **POST**   | `/api/events/cancel`          | Cancel a booking and assign a waiting list user (if available).       | ✅                |
| **GET**    | `/api/events/status/:eventId` | Get the current status of an event (tickets available, waiting list). | ❌                |

---

## 🔧 Rate Limiting

To prevent the abuse of the API, I have implemented rate limiting:

- **15 minutes window.**
- **100 requests per window per IP.**

### Rate Limit Error

```bash
{
  "success": false,
  "message": "Too many requests, please try again later."
}
```

## Logging System

- **Winston** is used to log every request and track errors.
- Logs are stored in logs/combined.log and logs/error.log.

### Example Log

```bash
{
  "message": "POST /api/events/book - 192.168.0.1",
  "level": "info",
  "timestamp": "2025-02-06T00:00:00Z"
}
```
