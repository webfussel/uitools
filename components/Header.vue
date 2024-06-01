<template>
  <header class="Header">
    <div class="top z-3">
      <h1>
        <span class="highlight">UI</span>Tools
      </h1>
      <nav>
        <ul>
          <li v-for="element in navElements" :key="element.name">
            <NuxtLink :to="element.link" active-class="active">
              <Icon :name="element.icon"/>
              <span>{{ element.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
interface NavElement {
  name: string
  link: string
  icon: string
}

const navElements: NavElement[] = [
  {
    name: 'Colors',
    link: '/colors',
    icon: 'colors',
  },
  {
    name: 'Fonts',
    link: '/fonts',
    icon: 'fonts',
  },
  {
    name: 'Spacing',
    link: '/spacing',
    icon: 'spacing',
  },
]
</script>
