import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

describe('<PokemonPicture/>', () => {
  test('should render the hidden image when showPokemon prop is false', () => {
    const pokemonId = 25;

    const wrapper = mount(PokemonPicture, {
      props: { pokemonId, showPokemon: false },
    });

    const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

    const image = wrapper.find('img');
    const attributes = image.attributes();

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
        src: imageSource,
      }),
    );
    // expect(wrapper.find('.fade-in').exists()).toBe(false);
    // expect(wrapper.find('.brightness-0').exists()).toBe(true);
  });
  test('should render the hidden image when showPokemon prop is true', () => {
    const pokemonId = 25;

    const wrapper = mount(PokemonPicture, {
      props: { pokemonId, showPokemon: true },
    });

    const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

    const image = wrapper.find('img');
    const attributes = image.attributes();

    expect(attributes).toEqual(
      expect.objectContaining({
        alt: 'pokemon image',
        class: 'fade-in h-[200px]',
        src: imageSource,
      }),
    );
  });
});
