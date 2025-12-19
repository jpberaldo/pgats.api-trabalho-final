import faker from 'k6/x/faker';

const random = () => { return Math.floor(Math.random() * 1000000) };

export function randomProduct() {
    return `Prod-teste-${random()}`;

};

export function randomUsername() {
    return `username-teste-${random}`;

};

export const randomPrice = faker.numbers.intRange(1, 1000);
