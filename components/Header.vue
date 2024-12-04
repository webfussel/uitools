<template>
  <header class="Header content-paddings">
    <h1>
      <NuxtLink to="/">
        <img src="/img/logo.svg" alt="UI Tools Logo" />
      </NuxtLink>
    </h1>
    <nav>
      <ul>
        <li v-for="element in navElements" :key="element.name">
          <span v-if="element.wip" class="badge">WIP</span>
          <NuxtLink :to="element.link" active-class="active">
            <Icon :name="element.icon"/>
            <span>{{ element.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
interface NavElement {
  name: string
  link: string
  icon: string
  wip: boolean
}

const navElements: NavElement[] = [
  {
    name: 'Colors',
    link: '/colors',
    icon: 'colors',
    wip: false,
  },
  {
    name: 'Fonts',
    link: '/sizing',
    icon: 'fonts',
    wip: true,
  },
  {
    name: 'Spacing',
    link: '/spacing',
    icon: 'spacing',
    wip: true,
  },
]
</script>
