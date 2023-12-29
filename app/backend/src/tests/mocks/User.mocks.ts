const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
};

const userLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin'
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzAzODkxMTU3LCJleHAiOjE3MDM4OTQ3NTd9.04vGJ8jrAdEaLYo9hZkKU7lG4sVHAZV2NAH5maV2Rqc';

export {
  user,
  userLogin,
  token,
}