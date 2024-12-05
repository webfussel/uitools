<template>
  <div class="Preview" :style="{ background: bg}">
    <div class="flex-col gap-default">
      <header v-for="header in headerVariants" :style="header.style">
        <span>{{ header.name }}</span>
        <ul class="flex-row gap-default">
          <li>Nav 1</li>
          <li>Nav 2</li>
          <li>Nav 3</li>
        </ul>
      </header>
    </div>
    <article class="flex-col gap-default">
      <span class="article-header">A nice article</span>
      <div class="article-wrapper flex-row gap-default">
        <div class="article-text flex-col gap-default">
          <p class="article-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam asperiores commodi corporis dolore dolorem dolorum, eos fuga in
            inventore laborum nam nostrum nulla porro sed temporibus, vero voluptas, voluptatibus? Adipisci assumenda, consectetur, consequuntur,
            debitis earum esse ex ipsa ipsam nihil nostrum repellendus rerum similique tempore. A at consequatur ea eligendi ipsum magni obcaecati,
            officiis rem sequi tempora vitae voluptas. Distinctio dolor doloremque ducimus laborum modi? Hic, non quidem. Ad beatae dolorum esse ipsam
            vero! Assumenda consequatur cumque eos molestiae perspiciatis quis tempora. Odit officia quod sequi tempora ullam voluptates. Accusamus,
            <a :style="linkMain">accusantium beatae cupiditate dignissimos</a> eos esse, itaque laboriosam maiores provident quas, repellat vitae. Blanditiis cupiditate iusto
            laudantium, necessitatibus pariatur perspiciatis placeat porro possimus recusandae totam ut voluptas, voluptatem voluptates! Ex, minima,
            quia. Ad cumque nihil nobis possimus, praesentium qui quibusdam quisquam ratione reiciendis tenetur vel velit? Eligendi impedit incidunt,
            maiores placeat, quasi quo reiciendis sequi sit vel vero voluptas!
          </p>
          <p class="article-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam asperiores commodi corporis dolore dolorem dolorum, eos fuga in
            inventore laborum nam nostrum nulla porro sed temporibus, vero voluptas, voluptatibus? Adipisci assumenda, consectetur, consequuntur,
            debitis earum esse ex ipsa ipsam nihil nostrum repellendus rerum similique tempore. A at consequatur ea eligendi ipsum magni obcaecati,
            officiis rem sequi tempora vitae voluptas. Distinctio dolor doloremque ducimus laborum modi? Hic, non quidem. Ad beatae dolorum esse ipsam
            vero! Assumenda <a :style="linkAccent">consequatur cumque eos molestiae perspiciatis</a> quis tempora. Odit officia quod sequi tempora ullam voluptates. Accusamus,
            accusantium beatae cupiditate dignissimos eos esse, itaque laboriosam maiores provident quas, repellat vitae. Blanditiis cupiditate iusto
            laudantium, necessitatibus pariatur perspiciatis placeat porro possimus recusandae totam ut voluptas, voluptatem voluptates! Ex, minima,
            quia. Ad cumque nihil nobis possimus, praesentium qui quibusdam quisquam ratione reiciendis tenetur vel velit? Eligendi impedit incidunt,
            maiores placeat, quasi quo reiciendis sequi sit vel vero voluptas!
          </p>
          <div class="button-grid">
            <button v-for="button in buttonVariants" :style="button.style">{{button.name}}</button>
          </div>
        </div>
        <div class="article-image">
          <img src="https://picsum.photos/1000/1000" alt="Article Image" />
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Colors'

const colorMain = inject<Color>('colorMain')!
const colorAccent = inject<Color>('colorAccent')!
const bg = inject<string>('bg')!

const createHeaderVariantsFromColor = (color : Color, name : string) => [
  {
    name: `${name} Bar`,
    style: {
      background: color.value,
      color: color.contrast,
    },
  },
  {
    name: `${name} Bar Inverted`,
    style: {
      background: 'none',
      color: color.value,
    },
  },
]

const headerVariants = [
  ...createHeaderVariantsFromColor(colorMain, 'Main'),
  ...createHeaderVariantsFromColor(colorAccent, 'Accent'),
]

const createButtonVariantsFromColor = (color : Color, name : string) => [
  {
    name: `${name} Solid`,
    style: {
      background: color.value,
      color: color.contrast,
    },
  },
  {
    name: `${name} Ghost`,
    style: {
      background: 'none',
      color: color.value,
    },
  },
  {
    name: `${name} Outline`,
    style: {
      background: 'none',
      color: color.value,
      border: `1px solid ${color.value}`,
    },
  },
  {
    name: `${name} Flat`,
    style: {
      background: 'none',
      color: color.value,
      'box-shadow': 'none',
    }
  },
]

const buttonVariants = [
  ...createButtonVariantsFromColor(colorMain, 'Main'),
  ...createButtonVariantsFromColor(colorAccent, 'Accent'),
]

const linkMain = { color: colorMain.value }
const linkAccent = { color: colorAccent.value }
</script>

<style scoped>
.Preview {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 0.5rem;

  & span {
    font-size: 1.5rem;
  }

  & ul {
    display: flex;
    align-items: center;
  }
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 1rem;
}

button {
  all: unset;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  cursor: pointer;
  text-align: center;

  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
}

article {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  & .article-wrapper {
    display: flex;
  }

  & .article-text {
    flex: 2;
    display: flex;
    flex-direction: column;
  }

  & .article-image {
    flex: 1;
    width: 100%;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
  }

  & .article-header {
    font-size: 1.5rem;
    font-weight: bold;
  }
}

a {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
