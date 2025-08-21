// Tests for GET /products/search

describe('GET /products/search', () => {
  const baseUrl = 'https://dummyjson.com/products';

  it('should return products matching the query', () => {
    const query = 'phone';
    cy.request(`${baseUrl}/search?q=${query}`).its('body.products').should((products) => {
      expect(products).to.be.an('array');
      const matching = products.filter(p => p.title.toLowerCase().includes(query));
      expect(matching.length).to.be.greaterThan(0);
    });
  });

  it('should return empty array for no matches', () => {
    cy.request(`${baseUrl}/search?q=zzzzzzzzzzzzzzzzzzzz`).its('body.products').should('be.an', 'array').and('have.length', 0);
  });

  it('should return default products for missing query param', () => {
    cy.request({ url: `${baseUrl}/search`, failOnStatusCode: false }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property('products').that.is.an('array').and.has.length(30);
    });
  });
});
