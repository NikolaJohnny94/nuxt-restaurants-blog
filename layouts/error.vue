<template>
    <div>
        <div id="container"></div>
        <b-row class="mt-2" align-h="center">
            <h1 class="mt-2 text-danger">404 | Page not found</h1>
            <span class="ml-2 text-danger">
                <FontAwesome :icon="['fas', 'exclamation-triangle']" />
            </span>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'ErrorPage',
    data() {
        return {
            og_image_url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
        }
    },
    head() {
        return {
            title: "404 | Not Found 🍴👨‍🍳 | Nuxt.js ⛰️ & Strapi.io App 🚀",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Page Not Found 🍴🍝🍰☕ Restaurants blog made with Nuxt.js 2 and BootstrapVue ⛰️, fetching data from the Strapi.io API 🚀",
                },
                {
                    hid: "og:image",
                    property: "og:image",
                    content: this.og_image_url
                },
            ],
        };
    },
}
</script>

<style scoped>
h1 {
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6),
        3.5px 3.5px 3.5px rgba(255, 255, 255, 0.6);
}

span {
    font-size: 40px !important;
}
.row {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#container {
    height: 105vh;
    background-image: url("https://images.unsplash.com/photo-1582920980795-2f97b0834c58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(16px);
}
</style>
