<template>
  <div>
    <div v-if="restaurants.length !== 0">
      <h1 class="text-center mt-3 mb-4">
        <em>Restaurants</em>
      </h1>
      <b-row>
        <b-col v-for="restaurant in itemsPerPage" :key="restaurant.id" xs="10" sm="6" md="4" lg="3">
          <NuxtLink :to="`/restaurant/${restaurant.id}`">
            <b-card
              :title="restaurant.name"
              :img-src="restaurant.images[0].name"
              :img-alt="restaurant.images[0].alternativeText"
              img-top
              tag="article"
              class="m-3"
            >
              <b-card-text class="pb-1">
                {{
                  restaurant.description.substring(0, 185)
                }}...
              </b-card-text>
            </b-card>
          </NuxtLink>
        </b-col>
      </b-row>
      <b-row class="mt-4 pagination-row" align-h="center">
        <b-pagination
          class="bg-dark"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="data_list"
        ></b-pagination>
      </b-row>
    </div>
    <div class="spinner-container" v-else>
      <b-row>
        <div class="text-center mb-3 d-flex justify-content-between m-auto">
          <h2 class="text-success spinner-text">
            <em>Loading...</em>
          </h2>
          <b-spinner variant="success"></b-spinner>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      restaurants: [],
      perPage: 4,
      currentPage: 1,
    }
  },
  async mounted() {
    const res = await this.$axios.$get("/restaurants")
    this.restaurants = res
  },
  computed: {
    itemsPerPage() {
      return this.restaurants
        .slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        )
    },
    rows() {
      return this.restaurants.length
    },
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
.spinner-container {
  margin-top: 15%;
}
.spinner-text {
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
}
.pagination-row {
  margin-top: 5% !important;
}
</style>
