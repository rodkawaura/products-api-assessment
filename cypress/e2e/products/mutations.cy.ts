// Tests for POST /products/add, PUT /products/:id, DELETE /products/:id

describe('POST /products/add', () => {
  const baseUrl = 'https://dummyjson.com/products';

  it('should add a new product', () => {
    cy.fixture('new-product.json').then((newProduct) => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/add`,
        body: newProduct,
        headers: { 'Content-Type': 'application/json' }
      }).its('body').should((body) => {
        expect(body).to.include(newProduct);
        expect(body).to.have.property('id');
      });
    });
  });

  it('should create a product even if title is missing (API quirk)', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/add`,
      body: {},
      failOnStatusCode: false,
      headers: { 'Content-Type': 'application/json' }
    }).then((resp) => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property('id');
    });
  });
});

describe('PUT /products/:id', () => {
  const baseUrl = 'https://dummyjson.com/products';

  it('should update a product', () => {
    cy.fixture('update-product.json').then((updatedProduct) => {
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/1`,
        body: updatedProduct,
        headers: { 'Content-Type': 'application/json' }
      }).its('body').should((body) => {
        expect(body).to.include({ id: 1, ...updatedProduct });
      });
    });
  });

  it('should return 404 for updating non-existent product', () => {
    cy.fixture('invalid-product.json').then((invalidProduct) => {
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/99999`,
        body: invalidProduct,
        failOnStatusCode: false,
        headers: { 'Content-Type': 'application/json' }
      }).then((resp) => {
        expect([404, 400]).to.include(resp.status);
      });
    });
  });
});

describe('DELETE /products/:id', () => {
  const baseUrl = 'https://dummyjson.com/products';

  it('should delete a product', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/1`
    }).its('body').should((body) => {
      expect(body).to.include({ id: 1, isDeleted: true });
    });
  });

  it('should return 404 for deleting non-existent product', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/99999`,
      failOnStatusCode: false
    }).then((resp) => {
      expect([404, 400]).to.include(resp.status);
    });
  });
});
