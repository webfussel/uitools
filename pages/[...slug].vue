<script setup lang="ts">
const route = useRoute()

if (route.fullPath === '/' || route.fullPath === '') {
  navigateTo('/colors')
}
</script>
