// Creating a utils functions for key as redis stores the data in key:value pair.

export function getKeyName(...args: string[]){
    return `bites:${args.join(':')}`
}

// getKeyName('restaurant', '123', 'reviews')

export const restaurantKeyById = (id: string) => getKeyName('restaurants', id);