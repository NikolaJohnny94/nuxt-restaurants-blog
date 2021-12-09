<template>
    <footer class="bg-dark">
        <div>
            <a
                v-for="i in icons.slice(0, 2)"
                :key="getIndex(icons, i)"
                :href="i.url"
                :title="i.title"
                target="_blank"
            >
                <FontAwesome
                    :icon="['fab', i.name]"
                    :class="[i.className, 'mt-2', 'mr-2', 'icons']"
                />
            </a>
            <p class="fw-bold m-2 text-light">Developed by Nikola</p>
            <a
                v-for="i in icons.slice(2, 4)"
                :key="getIndex(icons, i)"
                :href="i.url"
                :title="i.title"
                target="_blank"
            >
                <FontAwesome
                    :icon="['fab', i.name]"
                    :class="[i.className, 'mt-2', 'mr-2', 'icons']"
                />
            </a>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            icons: [
                {
                    name: 'github',
                    url: 'https://github.com/NikolaJohnny94',
                    title: 'Follow me on GitHub',
                    className: 'github'
                },
                {
                    name: 'linkedin-in',
                    url: 'https://www.linkedin.com/in/nikola-ivanovi%C4%87-2b6a13179/',
                    title: 'Let\'s connect on LinkedIn',
                    className: 'linkedin'
                },
                {
                    name: 'codepen',
                    url: 'https://codepen.io/NikolaJohnny/pens/public',
                    title: 'Follow me on CodePen',
                    className: 'codepen'
                },
                {
                    name: 'twitter',
                    url: 'https://twitter.com/nikola8794pwd',
                    title: 'Follow me on Twitter',
                    className: 'twitter'
                }
            ]
        }
    },
    methods: {
        getIndex(arr, item) {
            return arr.indexOf(item) + 1
        }
    }
}
</script>

<style scoped>
footer {
    position: fixed;
    bottom: 0;
    width: 100%;
}

footer > div {
    display: flex;
    justify-content: center;
}

footer > div > p {
    font-style: italic;
    font-size: 20px;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.icons {
    cursor: pointer;
}

.icons:active {
    transform: scale(0.9);
}

.github {
    color: #000;
    font-size: 28px;
}

.codepen {
    color: #fff;
    font-size: 28px;
}

.linkedin {
    color: #2867b2;
    font-size: 28px;
}

.twitter {
    color: #08a0e9;
    font-size: 28px;
}
</style>