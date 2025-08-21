// Tests for GET /products and related query params

describe('GET /products', () => {
  const baseUrl = 'https://dummyjson.com/products';

  it('should return 30 products by default', () => {
    cy.request(baseUrl).its('body').should((body) => {
      expect(body.products).to.be.an('array').and.have.length(30);
      expect(body).to.have.property('total').and.be.a('number');
      expect(body).to.have.property('skip', 0);
      expect(body).to.have.property('limit', 30);
    });
  });

  it('should paginate with limit and skip', () => {
    cy.request(`${baseUrl}?limit=10&skip=10`).its('body').should((body) => {
      expect(body.products).to.have.length(10);
      expect(body.skip).to.eq(10);
      expect(body.limit).to.eq(10);
    });
  });

  it('should select specific fields', () => {
    cy.request(`${baseUrl}?limit=1&select=title,price`).its('body.products[0]').should((product) => {
      expect(product).to.have.all.keys('id', 'title', 'price');
    });
  });

  it('should sort products by title ascending', () => {
    cy.request(`${baseUrl}?sortBy=title&order=asc`).its('body.products').should((products) => {
      expect(products).to.be.an('array');
      if (products.length > 1) {
        const titles = products.map((p) => p.title);
        const sorted = [...titles].sort();
        expect(titles).to.deep.equal(sorted);
      }
    });
  });

  it('should return empty array for skip >= total', () => {
    cy.request(`${baseUrl}?skip=10000`).its('body.products').should('be.an', 'array').and('have.length', 0);
  });

  it('should handle negative limit gracefully', () => {
    cy.request({url: `${baseUrl}?limit=-5`, failOnStatusCode: false}).its('status').should('be.oneOf', [400, 200]);
  });
});
