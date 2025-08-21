// Tests for GET /products/:id

describe('GET /products/:id', () => {
  const baseUrl = 'https://dummyjson.com/products';

  it('should return a product by id', () => {
    cy.request(`${baseUrl}/1`).its('body').should((body) => {
      expect(body).to.include({ id: 1 });
      expect(body).to.have.property('title');
    });
  });

  it('should return 404 for non-existent id', () => {
    cy.request({ url: `${baseUrl}/99999`, failOnStatusCode: false }).then((resp) => {
      expect([404, 400]).to.include(resp.status);
    });
  });

  it('should return 400 for invalid id', () => {
    cy.request({ url: `${baseUrl}/invalid`, failOnStatusCode: false }).then((resp) => {
      expect([400, 404]).to.include(resp.status);
    });
  });
});
