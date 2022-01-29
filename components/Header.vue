<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <NuxtLink to="/" title="Home">
                <img
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    alt="Logo"
                    class="logo"
                />
            </NuxtLink>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <!-- Navbar dropdowns -->
                    <b-nav-item-dropdown text="Category">
                        <li
                            class="text-center text-light"
                            v-for="category in categories"
                            :key="category.id"
                        >
                            <NuxtLink
                                :to="`/category/${category.id}`"
                                :title="`${category.name} category`"
                            >{{ category.name }}</NuxtLink>
                        </li>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            categories: []
        }
    },
    async fetch() {
        const res = await this.$http.$get('/categories').then(res => this.categories = res)
    }
}
</script>

<style scoped>
img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
}
.logo:active {
    transform: scale(0.95);
}
.navbar-collapse {
    justify-content: flex-end;
}

.navbar-nav {
    margin-right: 63px;
}

a {
    color: #fff;
    text-decoration: none;
}

ul.dropdown-menu.show li:hover {
    background-color: dodgerblue !important;
}
ul.dropdown-menu.show li:hover > a {
    color: #fff !important;
}

@media (min-width: 481px) and (max-width: 991px) {
}

@media (max-width: 480px) {
    .navbar-nav {
        margin-right: 0 !important;
    }
}
</style>