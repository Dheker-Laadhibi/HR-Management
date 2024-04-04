/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'dashboard',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/dashboard'
    },
    {
        id   : 'profile',
        title: 'Profile',
        type : 'basic',
        icon : 'heroicons_outline:user-circle',
        link : '/profile'
    },
    {
        id   : 'requests',
        title: 'Requests',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-document-check',
        link : '/mailbox'
    },
    {
        id      : 'accounts',
        title   : 'Accounts',
        type    : 'collapsable',
        icon    : 'heroicons_outline:shopping-cart',
        children: [
            {
                id   : 'accounts.users',
                title: 'Users',
                type : 'basic',
                link : '/users',
            },
            {
                id   : 'accounts.candidats',
                title: 'Candidats',
                type : 'basic',
                link : '/candidats',
            },
            {
                id   : 'accounts.interns',
                title: 'Interns',
                type : 'basic',
                link : '/interns',
            },
        ],
    },
    {
        id   : 'missions',
        title: 'Missions',
        type : 'basic',
        icon : 'heroicons_outline:check-circle',
        link : '/missions'
    },
    {
        id   : 'company',
        title: 'Company',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/company'
    },
    {
        id   : 'role',
        title: 'Role',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/role'
    },
    {
        id   : 'project',
        title: 'Project',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/project'
    },
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },
];

export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'projects',
        title: 'Projects',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-document-check',
        link : '/projects'
    },
    {
        id   : 'tests',
        title: 'Tests',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/tests'
    },
    {
        id   : 'qcm',
        title: 'QCM',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/qcm'
    },
];



