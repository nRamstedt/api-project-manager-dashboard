<?php

namespace ApiProjectManagerDashboard;

class App
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('admin_enqueue_scripts', array($this, 'enqueueScripts'));
        add_action('admin_menu', array($this, 'registerAdminPageForDashboard'));
        add_action('init', array($this, 'registerOptionsPageForDashboard'));
        add_action('admin_notices', array($this, 'printAdminPageNoticeForDashboard'), 100, 0);
    }

    public function printAdminPageNoticeForDashboard()
    {
        if (
            empty($_GET['page'])
            || $_GET['page'] !== 'api-project-manager-dashboard'
            || get_field('project_manager_dashboard_api_url', 'options')
        ) {
            return;
        }

        $class = 'notice notice-error';
        $message = __('Dashboard: Please enter a valid API URL in the options page.', API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN);

        printf('<div class="%1$s"><p>%2$s</p></div>', esc_attr($class), esc_html($message));
    }

    public function registerOptionsPageForDashboard()
    {
        if (function_exists('acf_add_options_sub_page')) {
            acf_add_options_sub_page(array(
                'page_title' => _x('Project Manager Dashboard settings', 'ACF', API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN),
                'menu_title' => _x('Options', 'Project Manager Dashboard settings', API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN),
                'menu_slug' => 'api-project-manager-dashboard-settings',
                'parent_slug' => 'api-project-manager-dashboard',
                'capability' => 'manage_options'
            ));
        }
    }

    public function registerAdminPageForDashboard()
    {
        add_menu_page(
            __('Innovation dashboard', API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN),
            __('Innovation dashboard', API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN),
            'edit_posts',
            'api-project-manager-dashboard',
            array($this, 'renderAdminPageForDashboard'),
            'dashicons-chart-bar',
            2
        );
    }

    public function renderAdminPageForDashboard()
    {
        $apiUrl = get_field('project_manager_dashboard_api_url', 'options');
        $classNames = implode(' ', [
            'js-api-project-manager-dashboard',
            'api-project-manager-dashboard--bg-white',
            'wp-admin-reset-css'
        ]);

        if ($apiUrl) {
            printf('<div class="%1$s" data-api-url="%2$s"></div>', esc_attr($classNames), esc_html($apiUrl));
        }
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        wp_register_style(
            'api-project-manager-dashboard-css',
            API_PROJECT_MANAGER_DASHBOARD_URL . '/dist/' .
            \ApiProjectManagerDashboard\Helper\CacheBust::name('css/api-project-manager-dashboard.css')
        );
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        if (empty($_GET['page']) || $_GET['page'] !== 'api-project-manager-dashboard') {
            return;
        }

        wp_enqueue_script(
            'api-project-manager-dashboard-js',
            API_PROJECT_MANAGER_DASHBOARD_URL . 'dist/' .
            \ApiProjectManagerDashboard\Helper\CacheBust::name('js/api-project-manager-dashboard.js', false)
        );
    }
}
