import {tagNames} from '../utils';

exports.seed = async function (knex, Promise) {
  const tags: object[] = tagNames.map(tagname => {
    return {name: tagname};
  });
  return knex('tags').insert(tags);
};
