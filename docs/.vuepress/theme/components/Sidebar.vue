<template>
    <aside class="menu">
        <ul class="menu-list">
            <li
                v-for="link in alphabetizedLinks"
            >
                <router-link
                    :to="`/docs/${version}/${link.slug}`"
                    v-text="link.text"
                ></router-link>
            </li>
        </ul>
        <hr>
        <div class="columns is-vcentered is-centered">
            <div class="column is-narrow">
                <label class="label" for="versions">Version:</label>
            </div>
            <div class="column is-narrow">
                <div class="field">
                    <div class="control">
                        <div class="select">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
    export default {
        props: ['version', 'links'],
        computed: {
            alphabetizedLinks() {
                return this.links.sort((a, b) => a.text.localeCompare(b.text))
            }
        }
    }
</script>
