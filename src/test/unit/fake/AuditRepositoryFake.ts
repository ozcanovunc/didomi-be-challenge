export class AuditRepositoryFake {
  private db = [
    {
      "id": "eea0c1e0-14a7-4fb0-9a86-aaa",
      "userId": "1",
      "auditLog": {
        "consent": "sms_notifications",
        "enabled": false
      },
      "createdAt": "2022-01-04T08:09:15.503Z"
    },
    {
      "id": "eea0c1e0-14a7-4fb0-9a86-bbb",
      "userId": "1",
      "auditLog": {
        "consent": "email_notifications",
        "enabled": true
      },
      "createdAt": "2022-01-04T08:09:15.503Z"
    },
    {
      "id": "eea0c1e0-14a7-4fb0-9a86-ccc",
      "userId": "2",
      "auditLog": {
        "consent": "sms_notifications",
        "enabled": false
      },
      "createdAt": "2022-01-04T08:09:15.503Z"
    }
  ];
  public async find({ userId }) {
    return this.db.filter(e => e.userId === userId);
  }
  public async insert(record) {
    this.db.push(record);
  }
}