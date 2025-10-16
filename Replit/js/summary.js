/**
 * This function loads task metrics from the API and updates the summary page.
 */
async function loadTask() {
  try {
    const metrics = await api.getSummaryMetrics();
    updateSummary(metrics);
  } catch (error) {
    console.error("Error loading task metrics:", error);
  }
}

/**
 * This function updates the summary page with metrics from the API.
 * @param {Object} metrics - Metrics data from the API
 */ 
function updateSummary(metrics) {
  document.getElementById('assignments').innerText = `${metrics.total_tasks || 0}`;
  document.getElementById('todo').innerText = `${metrics.todo_count || 0}`;
  document.getElementById('done').innerText = `${metrics.done_count || 0}`;
  document.getElementById('pending-response').innerText = `${metrics.awaiting_feedback_count || 0}`;
  document.getElementById('ongoing-task').innerText = `${metrics.in_progress_count || 0}`;
  document.getElementById('high-priority').innerText = `${metrics.high_priority_count || 0}`;
  document.getElementById('end-date').innerText = metrics.urgent_deadline 
    ? new Date(metrics.urgent_deadline).toLocaleDateString() 
    : 'No urgent to-dos';
}