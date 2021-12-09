<template>
  <div>
    <h1 class="text-center mb-4 mt-3">{{ restaurant.name }}</h1>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="30000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        id="b-carousel"
        v-for="image in images"
        :key="image.id"
        :caption="image.caption"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        :img-src="image.name"
        :img-alt="image.alternativeText"
      ></b-carousel-slide>
    </b-carousel>
    <p class="tags mt-3">
      <em>
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          class="bg-success text-light m-3 pl-3 pr-3 d-block text-center"
          :to="`/category/${category.id}`"
          :title="`${category.name} category`"
        >{{ category.name }}</NuxtLink>
      </em>
    </p>
    <p class="mt-4 ml-3">
      <strong>Description</strong>
      : {{ restaurant.description }}
    </p>
    <h2 class="ml-3 mb-4">Reviews</h2>
    <div class="ml-3" v-for="review in reviews" :key="review._id">
      <NuxtLink :to="`/person/${review.persons[0]}`">
        <Person :id="review.persons[0]" />
      </NuxtLink>
      <p class="mb-1">
        <em>"{{ review.review }}"</em>
      </p>
      <p class="mt-0">
        <small>
          <em>
            {{ review.published_at.split("T")[0] }} ({{
              review.published_at.split("T")[1].split(".")[0]
            }})
          </em>
        </small>
      </p>
    </div>
    <b-button variant="danger" class="text-light back-button ml-3" @click="$router.go(-1)">Back</b-button>
  </div>
</template>

<script>
export default {
  name: "Restaurant",
  data() {
    return {
      restaurant: {},
      meta_description: '',
      images: [],
      categories: [],
      reviews: [],
      slide: 0,
      sliding: null,
    };
  },
  head() {
    return {
      title: `${this.restaurant.name} 🍴👨‍🍳 | Nuxt.js ⛰️ & Strapi.io App 🚀`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `"${this.meta_description}"`
        }
      ]
    }
  },
  async mounted() {
    const res = await this.$axios
      .$get(`/restaurants/${this.$route.params.id}`)
      .then((res) => {
        (this.restaurant = res),
          (this.images = res.images),
          (this.categories = res.categories),
          (this.meta_description = res.description.substring(0, 146)),
          (this.reviews = res.reviews);
      });
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>
<style scoped>
#b-carousel {
  max-height: 480px !important;
}
.carousel {
  margin: auto;
  width: 65% !important;
}

.carousel-item {
  height: 30% !important;
}

.tags {
  display: flex;
  justify-content: center;
}

.tags a {
  color: #fff !important;
}

a:hover,
a:active {
  text-decoration: none;
}

a {
  color: #000 !important;
  text-decoration: none !important;
}

@media (max-width: 480px) {
  .carousel {
    width: 100% !important;
  }
}
</style>
