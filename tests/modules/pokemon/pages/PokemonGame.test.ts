import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi, type Mock } from 'vitest';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const pokemonsOptions = [
  { id: 1, name: 'bulbasaur' },
  { id: 2, name: 'ivysaur' },
  { id: 3, name: 'venusaur' },
  { id: 4, name: 'charmander' },
];

describe('<PokemonGame/>', () => {
  test('should initialize with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: undefined,
      isLoadind: true,
      gameStatus: GameStatus.Playing,
      pokemonOptions: [],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.get('h1').text()).toBe('¿Quien es este pokemon?');
    expect(wrapper.get('h1').classes()).toEqual(['m-5']);
  });

  test('should render <PokemonPicture /> and <PokemonOptions/>', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: pokemonsOptions.at(0),
      isLoadind: false,
      gameStatus: GameStatus.Playing,
      pokemonOptions: pokemonsOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsOptions.at(0)?.id}.svg`;
    const pokemons = pokemonsOptions.map((p) => p.name);

    // console.log(wrapper.html());
    expect(wrapper.find('img').attributes('src')).toBe(imgUrl);

    const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100');

    expect(buttons.length).toBe(4);

    buttons.forEach((button) => {
      expect(pokemons).toContain(button.text());
    });
  });

  test('should render button for a new game', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: pokemonsOptions.at(0),
      isLoadind: false,
      gameStatus: GameStatus.Won,
      pokemonOptions: pokemonsOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('[data-test-id="btn-new-game"]');

    expect(button.text()).toBe('¿Jugar de nuevo?');
  });

  test('should call the getNextRound function when the button is clicked', async () => {
    const getNextRound = usePokemonGame().getNextRound as Mock;

    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: pokemonsOptions.at(0),
      isLoadind: false,
      gameStatus: GameStatus.Won,
      pokemonOptions: pokemonsOptions,
      checkAnswer: vi.fn(),
      getNextRound: getNextRound,
    });

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('[data-test-id="btn-new-game"]');

    await button.trigger('click');

    expect(getNextRound).toHaveBeenCalled();
    expect(getNextRound).toHaveBeenCalledWith(4);
  });
});
