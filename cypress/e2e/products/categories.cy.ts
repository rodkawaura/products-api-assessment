// Tests for GET /products/categories and /products/category/:category

describe('GET /products/categories', () => {
  const baseUrl = 'https://dummyjson.com/products';

  it('should return all product categories', () => {
    cy.request(`${baseUrl}/categories`).its('body').should((categories) => {
      expect(categories).to.be.an('array').and.not.be.empty;
      categories.forEach((cat) => {
        expect(cat).to.have.all.keys('slug', 'name', 'url');
      });
    });
  });
});

describe('GET /products/category/:category', () => {
  const baseUrl = 'https://dummyjson.com/products';

  it('should return products for a valid category', () => {
    const category = 'smartphones';
    cy.request(`${baseUrl}/category/${category}`).its('body.products').should((products) => {
      expect(products).to.be.an('array');
      if (products.length) {
        expect(products[0].category).to.eq(category);
      }
    });
  });

  it('should return empty array for non-existent category', () => {
    cy.request({ url: `${baseUrl}/category/doesnotexist`, failOnStatusCode: false }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property('products').that.is.an('array').and.has.length(0);
    });
  });
});
