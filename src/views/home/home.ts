import { defineComponent, reactive } from 'vue';
import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import { type HomeManager } from "@/views/home/types";
import infrastructure from "@/infrastructure";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "Home",
    components: {
        InputText,
        Button,
    },
    setup: () => {
        const router = useRouter();

        if (localStorage.getItem("VUE_APP_USER_ID") && localStorage.getItem("VUE_APP_USER_NAME")) {
            router.push({ name: "recipes" });
        }

        const HOME_MANAGER: HomeManager = {
            state: reactive({
               id: "",
            }),
            changeId: (id) => {
                HOME_MANAGER.state.id = id;
            },
            load: async () => {
                const id = HOME_MANAGER.state.id.trim();
                try {
                    const user = await infrastructure.user.getById({ id });
                    if (!user.id) return;
                    localStorage.setItem("VUE_APP_USER_ID", user.id);
                    localStorage.setItem("VUE_APP_USER_NAME", user.name);
                    await router.push({ name: "recipes" });
                } catch (error) {
                    console.error(error);
                }
            },
        };

        return {
            HOME_MANAGER,
        };
    },
});
