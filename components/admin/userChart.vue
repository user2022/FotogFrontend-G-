<script>
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    name: "userChart",
    data() {
        return {
            chartdata: {
                labels: ['January', 'February'],
                datasets: [{label: 'Data One', backgroundColor: 'red', data: [40, 30, 0]}]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options);
    }
}
</script>

<style scoped>

</style>
