<template>
    <div>
        <div
            v-if="person.username || person.firstname || person.lastname || person.about || profile_image !== ''"
        >
            <p>
                <img class="mt-3" :src="profile_image" :alt="altText" :title="caption" />
            </p>
            <p class="text-center">
                <em>{{ person.username }}</em>
            </p>
            <p class="text-center">
                <strong>First name:</strong>
                <br />
                {{ person.firstname }}
            </p>
            <p class="text-center">
                <strong>Last name:</strong>
                <br />
                {{ person.lastname }}
            </p>
            <p class="text-center">
                <strong>About:</strong>
                <br />
                {{ person.about }}
            </p>
            <b-button
                variant="danger"
                class="text-light back-button mt-3 ml-3 mb-4"
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
    name: 'PersonPage',
    data() {
        return {
            person: {},
            profile_image: '',
            altText: '',
            caption: '',
            about: '',
            og_image_url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        }
    },
    head() {
        return {
            title: `${this.person.username} ${this.person.gender === 'male' ? '🧔' : this.person.gender === 'female' ? '👩' : '🙂'} | Nuxt.js ⛰️ & Strapi.io App 🚀`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.about.substring(0, 134)
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: this.og_image_url
                }
            ]
        }
    },
    async fetch() {
        const res = await this.$http.$get(`/persons/${this.$route.params.id}`).then(res => {
            this.person = res
            this.profile_image = res.profile_image.name
            this.altText = res.profile_image.alternativeText
            this.caption = res.profile_image.caption
            this.about = res.about

        })
    }
}
</script>

<style scoped>
img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    display: block;
    margin: auto;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
.spinner-container {
    margin-top: 15%;
}
.spinner-text {
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
}

@media (min-width: 1367px) {
    .back-button {
        margin-top: 10% !important;
    }
}
</style>