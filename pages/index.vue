<template>
  <div>
    <h1 class="text-center mt-3 mb-4">
      <em>Restaurants</em>
    </h1>
    <b-row>
      <b-col v-for="restaurant in restaurants" :key="restaurant.id" xs="10" sm="6" md="4" lg="3">
        <NuxtLink :to="`/restaurant/${restaurant.id}`">
          <b-card
            :title="restaurant.name"
            :img-src="restaurant.images[0].name"
            :img-alt="restaurant.images[0].alternativeText"
            img-top
            tag="article"
            class="m-3"
          >
            <b-card-text>
              {{
                restaurant.description.substring(0, 185)
              }}...
            </b-card-text>
          </b-card>
        </NuxtLink>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      restaurants: []
    }
  },
  async mounted() {
    const res = await this.$axios.$get("/restaurants")
    this.restaurants = res
  }
}
</script>

<style scoped>
a {
  color: #000 !important;
  text-decoration: none !important;
}
.card {
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.1);
}
</style>
