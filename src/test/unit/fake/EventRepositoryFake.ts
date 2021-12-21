export class EventRepositoryFake {
  private db = [
    {
      "id": "932f45de-094b-400f-a37c-5c7c330b1126",
      "userId": "9efa3013-f2e4-497e-b910-c6a69767b4e4",
      "consent": "email_notifications",
      "enabled": true
    },
    {
      "id": "39642f59-540b-4201-8c68-d65368bc2315",
      "userId": "d425b368-0cda-409d-b24a-cfa5d8ae59ca",
      "consent": "email_notifications",
      "enabled": false
    },
    {
      "id": "9186c08b-aa43-45f8-8403-cf13dbb98954",
      "userId": "d425b368-0cda-409d-b24a-cfa5d8ae59ca",
      "consent": "sms_notifications",
      "enabled": true
    }
  ];
  public async find(params) {
    if (params) {
      return this.db.filter(e => e.userId === params.userId);
    }
    return this.db;
  }
  public findOne({ consent, userId }) {
    return this.db.find(e => e.userId === userId && e.consent === consent);
  }
  public async update(query, { enabled }) {
    const record = this.findOne(query);
    record.enabled = enabled;
    return this.db;
  }
  public async insert(record) {
    this.db.push(record);
  }
}