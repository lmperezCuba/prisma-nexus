import { createTestContext } from './__helpers'

const ctx = createTestContext()

it('ensures that a country can be created', async () => {
  // Create a new country
  const countryResult = await ctx.app.query(`                 
    mutation {
        createCountry(id: '8', name: 'Cuba') {            
        name
      }
    }
  `)

  // Snapshot that country and expect 
  expect(countryResult).toMatchInlineSnapshot(`                // 3
    Object {
      "createDraft": Object {
        "name": "Cuba"
      },
    }
  `)

})