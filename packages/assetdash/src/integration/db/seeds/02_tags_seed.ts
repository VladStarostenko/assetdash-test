import {tagNames} from '../utils';

export const seed = async function (knex) {
  const tags: object[] = tagNames.map(tagname => ({name: tagname}));
  return knex('tags').insert(tags);
};
