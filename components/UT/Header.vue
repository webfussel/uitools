<template>
  <header class="Header full-width">
    <div class="max-width">
      <NuxtLink to="/">
        <UTLogo />
      </NuxtLink>
      <nav>
        <ul>
          <li v-for="nav in navElements" :key="nav.name">
            <NuxtLink :to="nav.to" active-class="active">
              <Icon :name="nav.icon"/>
              <span>{{ nav.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <nav class="socials">
        <ul>
          <li v-for="social in socials" :key="social.name">
            <Icon :name="social.icon" size="1.5em" />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
type NavElement = {
  name: string
  to: string
  icon: string
}

const navElements: NavElement[] = [
  {
    name: 'Colors',
    to: '#colors',
    icon: 'solar:pallete-2-broken',
  },
  {
    name: 'Fonts',
    to: '#sizing',
    icon: 'solar:text-cross-broken',
  },
  {
    name: 'Spacing',
    to: '#spacing',
    icon: 'solar:align-horizonta-spacing-broken',
  },
]

const socials = [
  {
    name: 'GitHub',
    icon: 'lineicons:github',
    link: 'https://github.com/webfussel',
  },
  {
    name: 'Ko-Fi',
    icon: 'simple-icons:kofi',
    link: 'https://ko-fi.com/webfussel',
  },
]
</script>

<style scoped>
.Header {
  --padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 20000;
  backdrop-filter: blur(10px);
  border-bottom: var(--hero-line);
  padding: var(--padding) 0;

  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }

  & nav {
    font-size: 1rem;
    line-height: 1.5;

    & ul {
      display: flex;
      list-style: none;
      gap: 3rem;
      height: 100%;

      & li {
        position: relative;
        display: flex;

        & a {
          display: flex;
          align-items: center;
          gap: .5rem;
          font-weight: bold;
          color: var(--color-text);

          &:hover {
            color: var(--color-main-hover);
          }

          &.active {
            color: var(--color-main);
          }
        }
      }
    }
  }

  nav.socials ul {
    gap: 1rem;

    & li {
      align-items: center;
    }
  }
}
</style>
