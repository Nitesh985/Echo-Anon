import {faker} from '@faker-js/faker'

export const patterns = [
  "{{word.adjective}} {{animal.type}}",
  "{{food.ingredient}} {{company.name}}",
  "{{company.catchPhraseNoun}} {{animal.bird}}"
];

export const getFakeName = () => {
  return faker.helpers.fake(patterns)
}


