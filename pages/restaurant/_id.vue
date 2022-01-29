<template>
  <div>
    <div v-if="restaurant.name || restaurant.description">
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
      <b-button
        variant="danger"
        class="text-light back-button mt-3 ml-3 mb-3"
        @click="$router.go(-1)"
      >Back</b-button>
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
  name: "Restaurant",
  data() {
    return {
      restaurant: {},
      meta_description: "",
      images: [],
      categories: [],
      reviews: [],
      slide: 0,
      sliding: null,
      og_image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    };
  },
  head() {
    return {
      title: `${this.restaurant.name} 🍴👨‍🍳 | Nuxt.js ⛰️ & Strapi.io App 🚀`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `"${this.meta_description}"`,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.og_image_url
        }
      ]
    }
  },
  async fetch() {
    const res = await this.$http
      .$get(`/restaurants/${this.$route.params.id}`)
      .then((res) => {
        this.restaurant = res
        this.images = res.images
        this.categories = res.categories
        this.meta_description = res.description.substring(0, 134)
        this.reviews = res.reviews
      })
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
}
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
.spinner-container {
  margin-top: 15%;
}
.spinner-text {
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
}

@media (max-width: 480px) {
  .carousel {
    width: 100% !important;
  }
}
</style>
