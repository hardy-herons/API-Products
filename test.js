var chakram = require("chakram"),
  expect = chakram.expect;

describe("Product List", function() {
  let response;
  before("Make the initial request to all products", async () => {
    response = await chakram.get("http://localhost:3000/products/list");
    return response;
  });
  it("should return with a status code of 200", function() {
    expect(response).to.have.status(200);
  });

  it("should return an array", function() {
    // console.log(response.body);
    const body = response.body;
    expect(body).to.be.a("array");
  });

  it("should only return 5 with default parameters", () => {
    const body = response.body;
    expect(body).to.have.lengthOf(5);
  });
});

describe("Single Product Request", function() {
  let responses = [];
  before("Make the inital request to a single id", async () => {
    const multipleProducts = [1, 50, 150, 500, 2000];
    for (let id of multipleProducts) {
      let response = await chakram.get(`http://localhost:3000/products/${id}`);
      responses.push(response);
    }
    return responses;
  });

  it("should return with a status code of 200", function() {
    responses.forEach(response => {
      expect(response).to.have.status(200);
    });
  });
  it("should return a body as an object", () => {
    responses.forEach(response => {
      const body = response.body;
      expect(body).to.be.a("object");
    });
  });
  it("should test if features is an array", () => {
    responses.forEach(response => {
      const body = response.body;
      expect(body.features).to.be.a("array");
    });
  });
});
