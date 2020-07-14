<template>
    <Breadcrumb>
        <BreadcrumbItem
            v-for="item in currentPath"
            :to="{ name: item.name }"
            :key="item.name">{{ item.title }}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
export default {
    name: 'BreadcrumbNav',
    props: {
        currentPath: Array
    },
    methods: {
    }
};
</script>
