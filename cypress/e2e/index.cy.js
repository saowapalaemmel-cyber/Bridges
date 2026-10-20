describe('Bridges Home Page', () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/index.html')
  })

  describe('Page Load', () => {
    it('TC_IDX_001 Verify Bridges home page loads successfully', () => {
      cy.get('body').should('be.visible')
      cy.url().should('include', 'index.html')
      cy.title().should('eq', 'Home')
    })
  })

  describe('Header', () => {
    it('TC_IDX_002 Verify all header elements are displayed', () => {
      cy.get('.logo')
        .should('be.visible')
        .and('have.text', 'Bridges')
      
      cy.get('.navbar')
        .should('contain', 'Home')
        .and('contain', 'Menu')
        .and('contain', 'Orders')

      cy.get('.search-bar')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Search')

      cy.get('.cart-link')
        .should('be.visible')
        .and('contain', 'Cart')
    })
  })

  describe('Navigation', () => {
    it('TC_IDX_003 Verify Home navigation works', () => {
      cy.get('.navbar').contains('Home').click()
      cy.url().should('include', 'index.html')
    })
    it('TC_IDX_004 Verify Menu navigation works', () => {
      cy.get('.navbar').contains('Menu').click()
      cy.url().should('include', '#category')
      cy.get('#category').should('be.visible')
    })
    it('TC_IDX_005 Verify Orders navigation works', () => {
      cy.get('.navbar').contains('Orders').click()
      cy.url().should('include', 'orders.html')

    })
    it('TC_IDX_006 Verify Cart navigation works', () => {
      cy.get('.cart-link').contains('Cart').click()
      cy.url().should('include', 'checkout.html')
    })
  })

  describe('Hero Section', () => {
    it('TC_IDX_007 Verify hero section content displayed', () => {
      cy.get('.hero')
        .should('be.visible')
      cy.get('.tag')
        .should('be.visible')
        .and('contain', 'Bridges — dishes from many countries')
      cy.get('.hero h1')
        .invoke('text')
        .then((text) => {
          expect(text.replace(/\s+/g, ' ').trim())
            .to.equal('Taste the World in Every Bite')
        })
      cy.get('.hero p')
        .should('be.visible')
        .and('contain', 'Explore authentic dishes inspired by cultures across the globe.')
      cy.get('.hero-image img')
        .should('be.visible')
    })
  })

  describe('Category Filter', () => {
    it('TC_IDX_008 Verify All category filter',() => {
      cy.request('GET', 'http://localhost:3000/api/menu')
        .then((response) => {
          expect(response.status).to.eq(200)

        const menusFromAPI = response.body

        cy.selectCategory('All')

        cy.get('.menu-container')
        .should('have.length', menusFromAPI.length)
      })
    })


    it('TC_IDX_009 Verify Breakfast filter',() => {
      cy.request('GET', 'http://localhost:3000/api/menu')
      .then((response) => {
        expect(response.status).to.eq(200)

        const breakfast = response.body.filter(
          menu => menu.category === 'Breakfast'
        )

        cy.selectCategory('Breakfast')

        cy.get('.menu-container[data-category="Breakfast"]')
        .should('have.length', breakfast.length)

        breakfast.forEach(({ name }) => {
          cy.contains('.menu-container', name).should('be.visible')
        })
      })
    })

    it('TC_IDX_010 Verify Main Course filter',() => {
      cy.request('GET', 'http://localhost:3000/api/menu')
      .then((response) => {
        expect(response.status).to.eq(200)

        const mainCourse = response.body.filter(
          menu => menu.category === 'Main')

        cy.selectCategory('Main Course')
        cy.get('.menu-container[data-category="Main"]')
          .should('have.length', mainCourse.length)

        mainCourse.forEach(({ name }) => {
          cy.contains('.menu-container', name).should('be.visible')
        })
      })
    })

    it('TC_IDX_011 Verify Dessert filter',() => {
      cy.request('GET', 'http://localhost:3000/api/menu')
      .then((response) => {
        expect(response.status).to.eq(200)

        const desserts = response.body.filter(
          menu => menu.category === 'Dessert')

        cy.selectCategory('Dessert')
        cy.get('.menu-container[data-category="Dessert"]')
        .should('have.length', desserts.length)

        desserts.forEach(({ name }) => {
          cy.contains('.menu-container', name).should('be.visible')
        })
      })
    })

  })

  describe('Search', () => {
    it('TC_IDX_012 Search existing menu item',() => {
      cy.request('GET', 'http://localhost:3000/api/menu')
        .then((response) => {
        expect(response.status).to.eq(200)

        const menu = response.body.find(
          item => item.name.toLowerCase().includes('pasta')
        )

        expect(menu, 'Pasta menu exists in API').to.exist

        cy.searchMenu(menu.name)

        cy.get('.menu-container')
          .should('have.length', 1)

        cy.get('.menu-name')
          .should('contain',menu.name)
      })
    })

    it('TC_IDX_013 Search non-existing menu item',() => {
      cy.searchMenu('BurgerXYZ')
      cy.get('.menu-container').should('have.length', 0)
    })

    it('TC_IDX_014 Search with lowercase characters',() => {
      cy.request('GET', 'http://localhost:3000/api/menu')
        .then((response) => {
          expect(response.status).to.eq(200)

          const menu =response.body.find(
            item => item.name.toLowerCase().includes('pasta')
          )

          expect(menu, 'Pasta menu exists in API').to.exist

          cy.searchMenu(menu.name.toLowerCase())

          cy.get('.menu-container')
            .should('have.length', 1)

          cy.get('.menu-name')
            .should('contain', menu.name)
        })
    })

    it('TC_IDX_015 Search with special characters',() => {
      cy.searchMenu('@pasta')

      cy.get('.menu-container')
        .should('have.length', 0)
    })
  })

  describe('Product Card', () => {
    it('TC_IDX_016 Verify product card information',() => {
      cy.request('GET', 'http://localhost:3000/api/menu')
        .then((response) => {
          expect(response.status).to.eq(200)

          const menusFromAPI = response.body

          cy.get('.menu-container')
            .should('have.length', menusFromAPI.length)
      
          menusFromAPI.forEach(menu => {
            cy.contains('.menu-name', menu.name)
              .parents('.menu-container')
              .within(() => {

                cy.get('.menu-name')
                  .should('have.text', menu.name)

                cy.get('.menu-price')
                  .should('contain', `฿${menu.price}`)

                cy.get('.menu-description')
                  .should('contain', menu.description)

                cy.get('.menu-image')
                  .should('have.attr', 'src')
                  .and('include', menu.image)

                cy.get('.flag')
                  .should('have.attr', 'src')
                  .and('include', menu.country)

                cy.get('.menu-rating-count')
                  .should('contain', `${menu.rating.count} reviews`)

              })
          })
        })
    })
  })

  describe('Quantity', () => {
    it('TC_IDX_017 Verify quantity increase',() => {
      cy.get('.js-quantity-1')
        .should('contain', '1')

      cy.get('.js-increase-btn[data-menu-id="1"]')
        .click()

      cy.get('.js-quantity-1')
        .should('contain', '2')
    })

    it('TC_IDX_018 Verify quantity decrease',() => {
      cy.get('.js-increase-btn[data-menu-id="1"]')
        .click()

      cy.get('.js-quantity-1')
        .should('contain', '2')

      cy.get('.js-decrease-btn[data-menu-id="1"]')
        .click()

      cy.get('.js-quantity-1')
        .should('contain', '1')
    })

    it('TC_IDX_019 Verify minimum quantity',() => {
      cy.get('.js-quantity-1')
        .should('contain', '1')

      cy.get('.js-decrease-btn[data-menu-id="1"]')
        .click()

      cy.get('.js-quantity-1')
        .should('contain', '1')
    })
  })


  describe('Cart', () => {
    it('TC_IDX_020 Verify add to cart',() => {
      cy.get('.js-cart-quantity')
        .should('contain','0')

      cy.addProduct(1)

      cy.verifyAddedButton(1)

      cy.get('.js-cart-quantity')
        .should('contain','1')
    })

    it('TC_IDX_021 Verify multiple quantities added',() => {
      cy.get(`.js-increase-btn[data-menu-id="1"]`)
        .click()
        .click()

      cy.get('.js-quantity-1')
        .should('contain', '3')

      cy.addProduct(1)

      cy.verifyAddedButton(1)

      cy.get('.js-cart-quantity')
        .should('contain','3')
    })

    it('TC_IDX_022 Verify multiple products added',() => {
      cy.addProduct(1)
      cy.verifyAddedButton(1)

      cy.addProduct(2)
      cy.verifyAddedButton(2)

      cy.addProduct(3)
      cy.verifyAddedButton(3)

      cy.get('.js-cart-quantity')
        .should('contain','3')
    })
  })

  describe('Cart Badge', () => {
    it('TC_IDX_023 Verify cart count updates',() => {
      cy.get('.js-cart-quantity')
        .should('contain','0')

      cy.addProduct(1)

      cy.get('.js-cart-quantity')
        .should('contain','1')
    })
    
    it('TC_IDX_024 Verify cart persists after refresh',() => {
      cy.addProduct(10)

      cy.get('.js-cart-quantity')
        .should('contain','1')

      cy.reload()

      cy.get('.js-cart-quantity')
      .should('contain','1')
    })
  })
})