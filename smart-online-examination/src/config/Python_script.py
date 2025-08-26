import requests

url = "http://localhost:8080/api/user/register"

# Required fields
data = {
    "firstName": "John",
    "lastName": "Doe",
    "gender": "Male",
    "phone": "123",
    "role": "ADMIN",
    "email": "john.doe@example.com",
    "password": "securePassword123"
}

# Optional fields
# Multiple departments can be added as a list of tuples
# departments = [1, 2, 3]  # example department IDs
# for dep in departments:
#     data.setdefault("departments", []).append(dep)

# data.update({
#     "majorId": 1,
#     "year": 2025,
#     "batch": 12,
#     "semester": 2,
#     "shift": 1,
#     "location": 5
# })

# Optional profile picture
files = {
    "profilePicture": open("../assets/images/a.jpg", "rb")  # comment this line if no picture
}

response = requests.post(url, data=data, files={})


print("Status Code:", response.status_code)
print("Response:", response.text)
