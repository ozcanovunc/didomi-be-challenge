export class UserRepositoryFake {
  private db = [
    {
      "id": "d425b368-0cda-409d-b24a-cfa5d8ae59ca",
      "email": "ozcan@gmail.com"
    },
    {
      "id": "9efa3013-f2e4-497e-b910-c6a69767b4e4",
      "email": "ozcan2@gmail.com"
    }
  ];
  public async find() {
    return this.db;
  }
  public async findOne(params) {
    if (params.email) {
      return this.db.find(e => e.email === params.email);
    }
    if (params) {
      return this.db.find(e => e.id === params);
    }
  }
  public async delete(id) {
    const index = this.db.findIndex(e => e.id === id);
    this.db.splice(index, 1);
    return {
      affected: index > -1 ? 1 : 0
    };
  }
  public async update(id, user) {
    const entity = this.db.find(e => e.id === id);
    entity && (entity.email = user.email);
  }
  public async insert(user) {
    this.db.push(user);
    return {
      identifiers: [{
        id: user.id
      }]
    }
  }
}