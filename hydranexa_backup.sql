--
-- PostgreSQL database dump
--

\restrict w8cH9n0YwwVx2UNBy65w7UItgjJzZflYkiicev23P8FV29nKw2viHGYqKLuUEBz

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ActiveTender; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ActiveTender" (
    id integer NOT NULL,
    title text NOT NULL,
    "tenderNo" text NOT NULL,
    "closingDate" text NOT NULL,
    type text NOT NULL,
    location text NOT NULL,
    status text NOT NULL,
    description text NOT NULL,
    content text NOT NULL,
    scope jsonb NOT NULL,
    eligibility jsonb NOT NULL,
    "contactOfficer" text NOT NULL,
    "contactEmail" text NOT NULL,
    "contactPhone" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ActiveTender" OWNER TO postgres;

--
-- Name: ActiveTender_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ActiveTender_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ActiveTender_id_seq" OWNER TO postgres;

--
-- Name: ActiveTender_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ActiveTender_id_seq" OWNED BY public."ActiveTender".id;


--
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'SUPER_ADMIN'::text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- Name: Admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Admin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Admin_id_seq" OWNER TO postgres;

--
-- Name: Admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Admin_id_seq" OWNED BY public."Admin".id;


--
-- Name: AnnualReport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AnnualReport" (
    id integer NOT NULL,
    year text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    file text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."AnnualReport" OWNER TO postgres;

--
-- Name: AnnualReport_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AnnualReport_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AnnualReport_id_seq" OWNER TO postgres;

--
-- Name: AnnualReport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AnnualReport_id_seq" OWNED BY public."AnnualReport".id;


--
-- Name: AwardNotice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AwardNotice" (
    id integer NOT NULL,
    project text NOT NULL,
    contractor text NOT NULL,
    "awardDate" text NOT NULL,
    value text NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."AwardNotice" OWNER TO postgres;

--
-- Name: AwardNotice_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AwardNotice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AwardNotice_id_seq" OWNER TO postgres;

--
-- Name: AwardNotice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AwardNotice_id_seq" OWNED BY public."AwardNotice".id;


--
-- Name: Contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Contact" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'Unread'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Contact" OWNER TO postgres;

--
-- Name: Contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Contact_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Contact_id_seq" OWNER TO postgres;

--
-- Name: Contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Contact_id_seq" OWNED BY public."Contact".id;


--
-- Name: DividendHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DividendHistory" (
    id integer NOT NULL,
    year text NOT NULL,
    dividend text NOT NULL,
    bonus text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DividendHistory" OWNER TO postgres;

--
-- Name: DividendHistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DividendHistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DividendHistory_id_seq" OWNER TO postgres;

--
-- Name: DividendHistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DividendHistory_id_seq" OWNED BY public."DividendHistory".id;


--
-- Name: Download; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Download" (
    id integer NOT NULL,
    title text NOT NULL,
    type text NOT NULL,
    size text NOT NULL,
    file text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Download" OWNER TO postgres;

--
-- Name: Download_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Download_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Download_id_seq" OWNER TO postgres;

--
-- Name: Download_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Download_id_seq" OWNED BY public."Download".id;


--
-- Name: Event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event" (
    id integer NOT NULL,
    title text NOT NULL,
    date text NOT NULL,
    location text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Event" OWNER TO postgres;

--
-- Name: Event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_id_seq" OWNER TO postgres;

--
-- Name: Event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;


--
-- Name: FinancialHighlight; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FinancialHighlight" (
    id integer NOT NULL,
    title text NOT NULL,
    value text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."FinancialHighlight" OWNER TO postgres;

--
-- Name: FinancialHighlight_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FinancialHighlight_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FinancialHighlight_id_seq" OWNER TO postgres;

--
-- Name: FinancialHighlight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FinancialHighlight_id_seq" OWNED BY public."FinancialHighlight".id;


--
-- Name: FinancialRatio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FinancialRatio" (
    id integer NOT NULL,
    title text NOT NULL,
    value text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."FinancialRatio" OWNER TO postgres;

--
-- Name: FinancialRatio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FinancialRatio_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FinancialRatio_id_seq" OWNER TO postgres;

--
-- Name: FinancialRatio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FinancialRatio_id_seq" OWNED BY public."FinancialRatio".id;


--
-- Name: Governance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Governance" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Governance" OWNER TO postgres;

--
-- Name: Governance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Governance_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Governance_id_seq" OWNER TO postgres;

--
-- Name: Governance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Governance_id_seq" OWNED BY public."Governance".id;


--
-- Name: InternshipProgram; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."InternshipProgram" (
    id integer NOT NULL,
    title text NOT NULL,
    duration text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."InternshipProgram" OWNER TO postgres;

--
-- Name: InternshipProgram_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."InternshipProgram_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."InternshipProgram_id_seq" OWNER TO postgres;

--
-- Name: InternshipProgram_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."InternshipProgram_id_seq" OWNED BY public."InternshipProgram".id;


--
-- Name: JobApplication; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."JobApplication" (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    "position" text NOT NULL,
    qualification text NOT NULL,
    experience text NOT NULL,
    company text,
    salary text,
    "coverLetter" text NOT NULL,
    cv text NOT NULL,
    status text DEFAULT 'Pending'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."JobApplication" OWNER TO postgres;

--
-- Name: JobApplication_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."JobApplication_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."JobApplication_id_seq" OWNER TO postgres;

--
-- Name: JobApplication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."JobApplication_id_seq" OWNED BY public."JobApplication".id;


--
-- Name: JobOpening; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."JobOpening" (
    id integer NOT NULL,
    "position" text NOT NULL,
    department text NOT NULL,
    location text NOT NULL,
    type text NOT NULL,
    deadline text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."JobOpening" OWNER TO postgres;

--
-- Name: JobOpening_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."JobOpening_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."JobOpening_id_seq" OWNER TO postgres;

--
-- Name: JobOpening_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."JobOpening_id_seq" OWNED BY public."JobOpening".id;


--
-- Name: LeadershipTeam; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LeadershipTeam" (
    id integer NOT NULL,
    name text NOT NULL,
    "position" text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."LeadershipTeam" OWNER TO postgres;

--
-- Name: LeadershipTeam_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LeadershipTeam_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."LeadershipTeam_id_seq" OWNER TO postgres;

--
-- Name: LeadershipTeam_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LeadershipTeam_id_seq" OWNED BY public."LeadershipTeam".id;


--
-- Name: MediaGallery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MediaGallery" (
    id integer NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    type text NOT NULL,
    image text,
    video text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MediaGallery" OWNER TO postgres;

--
-- Name: MediaGallery_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MediaGallery_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MediaGallery_id_seq" OWNER TO postgres;

--
-- Name: MediaGallery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MediaGallery_id_seq" OWNED BY public."MediaGallery".id;


--
-- Name: News; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."News" (
    id integer NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    author text NOT NULL,
    date text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    highlights text[],
    tags text[],
    featured boolean DEFAULT false NOT NULL,
    status text DEFAULT 'Draft'::text NOT NULL
);


ALTER TABLE public."News" OWNER TO postgres;

--
-- Name: News_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."News_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."News_id_seq" OWNER TO postgres;

--
-- Name: News_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."News_id_seq" OWNED BY public."News".id;


--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Project" (
    id integer NOT NULL,
    name text NOT NULL,
    location text NOT NULL,
    capacity text NOT NULL,
    status text NOT NULL,
    year text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    details text NOT NULL,
    progress text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    slug text NOT NULL,
    specifications jsonb NOT NULL,
    timeline jsonb NOT NULL
);


ALTER TABLE public."Project" OWNER TO postgres;

--
-- Name: Project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Project_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Project_id_seq" OWNER TO postgres;

--
-- Name: Project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Project_id_seq" OWNED BY public."Project".id;


--
-- Name: Setting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Setting" (
    id integer NOT NULL,
    "companyName" text NOT NULL,
    logo text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    facebook text,
    linkedin text,
    youtube text,
    instagram text,
    "websiteTitle" text,
    "metaDescription" text,
    "footerText" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Setting" OWNER TO postgres;

--
-- Name: Setting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Setting_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Setting_id_seq" OWNER TO postgres;

--
-- Name: Setting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Setting_id_seq" OWNED BY public."Setting".id;


--
-- Name: ShareInformation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ShareInformation" (
    id integer NOT NULL,
    title text NOT NULL,
    value text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ShareInformation" OWNER TO postgres;

--
-- Name: ShareInformation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ShareInformation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ShareInformation_id_seq" OWNER TO postgres;

--
-- Name: ShareInformation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ShareInformation_id_seq" OWNED BY public."ShareInformation".id;


--
-- Name: TenderDocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TenderDocument" (
    id integer NOT NULL,
    title text NOT NULL,
    type text NOT NULL,
    size text NOT NULL,
    "uploadDate" text NOT NULL,
    file text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TenderDocument" OWNER TO postgres;

--
-- Name: TenderDocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TenderDocument_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TenderDocument_id_seq" OWNER TO postgres;

--
-- Name: TenderDocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TenderDocument_id_seq" OWNED BY public."TenderDocument".id;


--
-- Name: TenderNotice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TenderNotice" (
    id integer NOT NULL,
    title text NOT NULL,
    "publishDate" text NOT NULL,
    location text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TenderNotice" OWNER TO postgres;

--
-- Name: TenderNotice_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TenderNotice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TenderNotice_id_seq" OWNER TO postgres;

--
-- Name: TenderNotice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TenderNotice_id_seq" OWNED BY public."TenderNotice".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'Admin'::text NOT NULL,
    status text DEFAULT 'Active'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: VendorRegistration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VendorRegistration" (
    id integer NOT NULL,
    "companyName" text NOT NULL,
    "registrationNumber" text NOT NULL,
    vat text NOT NULL,
    "businessCategory" text NOT NULL,
    "contactPerson" text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    password text NOT NULL,
    status text DEFAULT 'Pending'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VendorRegistration" OWNER TO postgres;

--
-- Name: VendorRegistration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VendorRegistration_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VendorRegistration_id_seq" OWNER TO postgres;

--
-- Name: VendorRegistration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VendorRegistration_id_seq" OWNED BY public."VendorRegistration".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: ActiveTender id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActiveTender" ALTER COLUMN id SET DEFAULT nextval('public."ActiveTender_id_seq"'::regclass);


--
-- Name: Admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN id SET DEFAULT nextval('public."Admin_id_seq"'::regclass);


--
-- Name: AnnualReport id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnnualReport" ALTER COLUMN id SET DEFAULT nextval('public."AnnualReport_id_seq"'::regclass);


--
-- Name: AwardNotice id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AwardNotice" ALTER COLUMN id SET DEFAULT nextval('public."AwardNotice_id_seq"'::regclass);


--
-- Name: Contact id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contact" ALTER COLUMN id SET DEFAULT nextval('public."Contact_id_seq"'::regclass);


--
-- Name: DividendHistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DividendHistory" ALTER COLUMN id SET DEFAULT nextval('public."DividendHistory_id_seq"'::regclass);


--
-- Name: Download id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Download" ALTER COLUMN id SET DEFAULT nextval('public."Download_id_seq"'::regclass);


--
-- Name: Event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);


--
-- Name: FinancialHighlight id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FinancialHighlight" ALTER COLUMN id SET DEFAULT nextval('public."FinancialHighlight_id_seq"'::regclass);


--
-- Name: FinancialRatio id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FinancialRatio" ALTER COLUMN id SET DEFAULT nextval('public."FinancialRatio_id_seq"'::regclass);


--
-- Name: Governance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Governance" ALTER COLUMN id SET DEFAULT nextval('public."Governance_id_seq"'::regclass);


--
-- Name: InternshipProgram id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InternshipProgram" ALTER COLUMN id SET DEFAULT nextval('public."InternshipProgram_id_seq"'::regclass);


--
-- Name: JobApplication id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."JobApplication" ALTER COLUMN id SET DEFAULT nextval('public."JobApplication_id_seq"'::regclass);


--
-- Name: JobOpening id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."JobOpening" ALTER COLUMN id SET DEFAULT nextval('public."JobOpening_id_seq"'::regclass);


--
-- Name: LeadershipTeam id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LeadershipTeam" ALTER COLUMN id SET DEFAULT nextval('public."LeadershipTeam_id_seq"'::regclass);


--
-- Name: MediaGallery id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MediaGallery" ALTER COLUMN id SET DEFAULT nextval('public."MediaGallery_id_seq"'::regclass);


--
-- Name: News id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."News" ALTER COLUMN id SET DEFAULT nextval('public."News_id_seq"'::regclass);


--
-- Name: Project id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project" ALTER COLUMN id SET DEFAULT nextval('public."Project_id_seq"'::regclass);


--
-- Name: Setting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Setting" ALTER COLUMN id SET DEFAULT nextval('public."Setting_id_seq"'::regclass);


--
-- Name: ShareInformation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ShareInformation" ALTER COLUMN id SET DEFAULT nextval('public."ShareInformation_id_seq"'::regclass);


--
-- Name: TenderDocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TenderDocument" ALTER COLUMN id SET DEFAULT nextval('public."TenderDocument_id_seq"'::regclass);


--
-- Name: TenderNotice id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TenderNotice" ALTER COLUMN id SET DEFAULT nextval('public."TenderNotice_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: VendorRegistration id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendorRegistration" ALTER COLUMN id SET DEFAULT nextval('public."VendorRegistration_id_seq"'::regclass);


--
-- Data for Name: ActiveTender; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ActiveTender" (id, title, "tenderNo", "closingDate", type, location, status, description, content, scope, eligibility, "contactOfficer", "contactEmail", "contactPhone", "createdAt", "updatedAt") FROM stdin;
1	 Construction Materials Supply	HNE-2026-001	25 August 2026	Open Competitive Biddings	Rasuwa, Nepal	Open	kjwndLNDLAEKN;OA	JNDLND'LKFM;/LCMx'ckd	["n;N/.,mxL/QXM"]	["JND'pkdk;d<X\\""]	Civil Procurement Office	civil@hydranexa.com	9876889990	2026-07-31 15:44:01.749	2026-07-31 15:48:46.321
\.


--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" (id, name, email, password, role, "isActive", "createdAt", "updatedAt") FROM stdin;
1	HydraNexa Super Admin	admin@hydranexa.com	$2b$10$J.e9wGxyyr2Pa72PP091PuCt8jU4wAraZ5Y3RfrmfdxYorpLlrtcm	SUPER_ADMIN	t	2026-07-30 07:34:04.312	2026-07-30 07:34:04.312
\.


--
-- Data for Name: AnnualReport; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AnnualReport" (id, year, title, description, file, "createdAt", "updatedAt") FROM stdin;
1	2025	Annual Report 2025	Comprehensive financials and operational performance for FY 2025.	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785491817/hydranexa/jtdkrnexbnmz40duacx9.pdf	2026-07-31 09:56:59.709	2026-07-31 09:57:28.484
2	2024	Annual Report 2024	Detailed overview of the company's annual financial results, project milestones, investment activities, and future business strategies.	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785744525/hydranexa/lebhfhzpgawucmznxgxf.pdf	2026-08-03 08:08:47.953	2026-08-03 08:08:47.953
3	2024	Annual Report 2024	Detailed overview of the company's annual financial results, project milestones, investment activities, and future business strategies.	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785744527/hydranexa/oxqd4tqxmhif8skq4ea0.pdf	2026-08-03 08:08:50.016	2026-08-03 08:08:50.016
4	2023	Annual Report 2023	Highlights of business growth, hydropower generation, environmental responsibility, and shareholder value creation during 2023.	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785744567/hydranexa/e0fg26ksld0sn1drjtxs.pdf	2026-08-03 08:09:29.657	2026-08-03 08:09:29.657
\.


--
-- Data for Name: AwardNotice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AwardNotice" (id, project, contractor, "awardDate", value, status, "createdAt", "updatedAt") FROM stdin;
1	Upper Marsyangdi Hydropower	ABC Construction Pvt. Ltd.	5 january 2026	NPR 25 Million	Awarded	2026-08-01 03:49:42.355	2026-08-01 03:49:56.876
\.


--
-- Data for Name: Contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Contact" (id, name, email, phone, subject, message, status, "createdAt") FROM stdin;
1	Krishna Gharti	krishna@gmail.com	9843299811	Hi how can i join us .	hi hydranexa	Read	2026-08-02 04:30:33.412
2	Ram Bahadur Gharti	ram@gmail.com	9843299811	joining	how can i join	Read	2026-08-02 05:26:42.084
\.


--
-- Data for Name: DividendHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DividendHistory" (id, year, dividend, bonus, "createdAt", "updatedAt") FROM stdin;
1	2025	12%	6%	2026-07-31 10:36:11.976	2026-07-31 10:36:26.403
\.


--
-- Data for Name: Download; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Download" (id, title, type, size, file, "createdAt", "updatedAt") FROM stdin;
1	Annual Report 2025	PDF	4.9 MB	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785508862/hydranexa/n60eqvnpnvqn4bhg7neg.pdf	2026-07-31 14:41:03.531	2026-07-31 14:41:20.165
\.


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event" (id, title, date, location, image, description, "createdAt", "updatedAt") FROM stdin;
1	CSR tree plantation	15 august 2026	Balaju	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785581103/hydranexa/u5gaabmvvbfuwmq1vhvy.avif	hukmk	2026-08-01 10:45:06.546	2026-08-01 10:45:21.845
\.


--
-- Data for Name: FinancialHighlight; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FinancialHighlight" (id, title, value, description, "createdAt", "updatedAt") FROM stdin;
1	Total Revenue	NPR 6.88	Annual Revenue	2026-07-31 08:52:20	2026-07-31 08:52:20
2	Net Profit	NPR 1.28	After Tax	2026-07-31 08:53:17.591	2026-07-31 08:53:17.591
3	Installed Capacity	157 MW	Hydropower Capacity	2026-07-31 08:54:05.262	2026-07-31 08:54:24.564
4	Total Assets	NPR 18B	Company Assets	2026-08-03 07:43:36.688	2026-08-03 07:43:36.688
5	Dividend	18%	Annual Dividend	2026-08-03 07:44:04.309	2026-08-03 07:44:04.309
\.


--
-- Data for Name: FinancialRatio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FinancialRatio" (id, title, value, "createdAt", "updatedAt") FROM stdin;
1	Return on Equity	14.8%	2026-07-31 09:12:35.807	2026-07-31 09:24:25.2
2	Debt To Equity	0.28	2026-08-03 07:42:00.045	2026-08-03 07:42:00.045
3	Current Ratio	2.10	2026-08-03 07:42:27.234	2026-08-03 07:42:27.234
4	Operation Margin	32%	2026-08-03 07:42:49.723	2026-08-03 07:42:49.723
\.


--
-- Data for Name: Governance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Governance" (id, title, description, "createdAt", "updatedAt") FROM stdin;
1	Board of Directors	Experienced professionals providing strategic leaderships and oversight for the company.	2026-07-31 10:46:54.094	2026-07-31 10:47:08.166
2	Audit & Risk Committee	The Audit & Risk Committee monitors financial reporting, internal controls, compliance, and risk management to ensure the company's operations meet regulatory and ethical standards.\n  	2026-08-03 08:05:57.254	2026-08-03 08:05:57.254
3	Corporate Ethics & Compliance	HydraNexa is committed to maintaining the highest standards of corporate ethics, regulatory compliance, responsible business practices, and integrity in all business activities.	2026-08-03 08:06:20.245	2026-08-03 08:06:20.245
\.


--
-- Data for Name: InternshipProgram; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."InternshipProgram" (id, title, duration, description, "createdAt", "updatedAt") FROM stdin;
1	IT internship	3 months	Work with web applications, digital systems, and software developments.	2026-08-01 04:29:04.551	2026-08-01 04:29:18.477
\.


--
-- Data for Name: JobApplication; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."JobApplication" (id, "fullName", email, phone, address, "position", qualification, experience, company, salary, "coverLetter", cv, status, "createdAt", "updatedAt") FROM stdin;
1	Ram Bahadur Gharti	ram@gmail.com	9843299811	balaju	Civil Engineer	Diploma	2		55555	n ,	Sadika_Mahat.pdf	Pending	2026-08-02 09:03:44.66	2026-08-02 09:04:29.191
2	shyam gharti	shyam@gmail.com	9800000000	ason	Mechanical Engineer	Bachelor's Degree	2	Donor	55555		https://res.cloudinary.com/jfxhbjdx/raw/upload/v1785661763/hydranexa/job-applications/vzpzbrkebzvf8ycq3gan	Pending	2026-08-02 09:09:23.954	2026-08-02 09:09:23.954
\.


--
-- Data for Name: JobOpening; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."JobOpening" (id, "position", department, location, type, deadline, "createdAt", "updatedAt") FROM stdin;
1	Civil Engineering	Engineering	Kathmandu 	Full Time	30 september 2026	2026-08-01 04:20:18.389	2026-08-01 04:20:36.875
2	Managing Department	Managing Project	Balaju	Full Time	30 august 2026	2026-08-02 09:59:17.751	2026-08-02 09:59:17.751
\.


--
-- Data for Name: LeadershipTeam; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LeadershipTeam" (id, name, "position", image, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: MediaGallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MediaGallery" (id, title, category, type, image, video, description, "createdAt", "updatedAt") FROM stdin;
2	hiulhe	Projects	Image	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785560439/hydranexa/zfrudagat2qqqjwmxmmr.jpg		nlknkl/;	2026-08-01 05:00:41.829	2026-08-01 05:01:03.634
1	Video	Projects	Video	https://res.cloudinary.com/jfxhbjdx/video/upload/v1785560019/hydranexa/hs7sgvvuwepdjtndoqa9.mp4	https://res.cloudinary.com/jfxhbjdx/video/upload/v1785561082/hydranexa/r8hauiytxpgwidpinios.mp4	click 	2026-08-01 04:53:42.382	2026-08-02 11:13:09.414
\.


--
-- Data for Name: News; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."News" (id, title, category, author, date, image, description, content, "createdAt", "updatedAt", highlights, tags, featured, status) FROM stdin;
1	HydraNexa Begins Construction of Upper Marsyangdi Project	Project Update	HydraNexa Communications Team	2026-07-30	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785396490/hydranexa/news/r2qdpdpgztcmrxpskfyf.avif	HydraNexa has officially started construction of the Upper Marsyangdi Hydropower Project to strengthen Nepal's clean energy future.	HydraNexa Energy has officially commenced construction of the Upper Marsyangdi Hydropower Project, marking another significant milestone in Nepal's renewable energy sector.\n\nThe project is designed to generate clean and sustainable electricity while supporting the country's increasing energy demand. Once completed, the project will contribute reliable power to the national grid and help reduce dependence on imported energy.	2026-07-30 07:28:11.676	2026-07-30 07:28:11.676	{"\\"Project Capacity: 148 MW\\"","\\"Location: Lamjung District\\"","\\"Project Type: Run-of-River Hydropower\\"","\\"Expected Completion: 2028\\""}	{"\\"Hydropower\\"","\\"Construction\\"","\\"Renewable Energy\\"","\\"Upper Marsyangdi\\""}	t	Published
2	swqdcfe	Project Update	HydraNexa Communications Team	2026-07-30	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785585327/hydranexa/vfi5riouw53hymcokgeb.avif	Cdcsdcsacsssssss	SACvaSDV 	2026-07-31 14:53:34.048	2026-08-01 11:55:54.525	{"\\"Project Capacity: 148 MW\\"","\\"Location: Lamjung District\\"","\\"Project Type: Run-of-River Hydropower\\"","\\"Expected Completion: 2028\\""}	{"\\"Hydropower\\"","\\"Construction\\"","\\"Renewable Energy\\"","\\"Upper Marsyangdi\\""}	t	Published
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Project" (id, name, location, capacity, status, year, image, description, details, progress, "createdAt", "updatedAt", featured, slug, specifications, timeline) FROM stdin;
1	Marsyangdi river	Kathmandu	296 MW	Ongoing	2025	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785584128/hydranexa/gvc8ee3wcrtkv5ktnigr.avif	ghjkklll	tuhjfkjfrkjfkr	75%	2026-07-30 08:19:26.49	2026-08-01 11:35:30.107	t	upper marsyangdi	{"river": "", "developer": "", "investment": "", "projectType": "", "annualEnergy": "", "constructionPeriod": ""}	[{"year": "2025", "title": "construction"}]
3	gandaki project	pokhara	296 MW	Upcoming	2024	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785584473/hydranexa/oa66qam7dl7opeejgmjj.avif	nklj	dnbk;j	100%	2026-08-01 11:41:16.051	2026-08-03 07:18:11.89	t	tamakoshi	{"river": "Marsyangdi River", "capacity": "45 MW", "province": "Gandaki Province", "developer": "HydraNexa Energy", "investment": "NPR 8 Billion"}	[{"year": "2025", "title": "Construction Started"}, {"year": "2026", "title": "75% Completed"}]
2	Upper Trishuli Hydropower Project	Rasuwa, Nepal	216 MW	Completed	2025	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785416553/hydranexa/news/emqjh4gpzq1svxd8e7gw.avif	srdtgfyuj;lk'	gvshlbjdgk'm\n/	75%	2026-07-30 13:02:33.863	2026-08-03 07:18:23.408	t	project	{"river": "Trishuli River", "developer": "HydraNexa Energy", "investment": "NPR 35 Billion", "projectType": "Run of River", "annualEnergy": "1200 gwh", "constructionPeriod": "2024-2026"}	[{"year": "s", "title": "t"}]
\.


--
-- Data for Name: Setting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Setting" (id, "companyName", logo, email, phone, address, facebook, linkedin, youtube, instagram, "websiteTitle", "metaDescription", "footerText", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ShareInformation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ShareInformation" (id, title, value, "createdAt", "updatedAt") FROM stdin;
1	Listed Exchanges	Nepal Stock Exchange (NEPSE)	2026-07-31 10:27:15.779	2026-07-31 10:28:14.966
\.


--
-- Data for Name: TenderDocument; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TenderDocument" (id, title, type, size, "uploadDate", file, "createdAt", "updatedAt") FROM stdin;
1	Construction Materials Tender Document	PDF	4.8 MB	20 july 2025	https://res.cloudinary.com/jfxhbjdx/image/upload/v1785553804/hydranexa/vm0qapjaqvnhgs56mebn.pdf	2026-08-01 03:10:05.973	2026-08-01 03:10:23.887
\.


--
-- Data for Name: TenderNotice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TenderNotice" (id, title, "publishDate", location, description, "createdAt", "updatedAt") FROM stdin;
1	Supply of Construction Materials	20 July 2026	Lamjung, Nepal	Invitation for sealed bids for the supply of construction materials for the Upper Marsyangdi Hydropower Project.	2026-07-31 16:09:02.025	2026-08-02 10:50:52.143
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password, role, status, "createdAt", "updatedAt") FROM stdin;
1	Krishna Gharti	krishna@gmail.com	$2b$10$ODBLsZJbF.eZ4fRlZW5AGOpKwaIOOpxvD4ydPv8KmnKj4c58Gi5BC	Admin	Active	2026-08-01 11:01:17.426	2026-08-01 11:02:19.547
2	Kinjan Gharti	kinjan@gmail.com	$2b$10$H3RaqUKxxU5OJwviXlNCXOSdmgwW1dE7Lz9e3JkJBTdpP0ClQs802	Super Admin	Active	2026-08-02 11:01:46.343	2026-08-02 11:01:46.343
\.


--
-- Data for Name: VendorRegistration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VendorRegistration" (id, "companyName", "registrationNumber", vat, "businessCategory", "contactPerson", email, phone, address, password, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9d903e50-8e9b-42a4-9ab3-217c8960dc82	95bd206a7b23329e10cf0d4cd7679cf5705e75c90ac70355de304fd2b0babc6a	2026-07-30 13:10:57.007208+05:45	20260728064525_create_news_table	\N	\N	2026-07-30 13:10:56.991453+05:45	1
5666e0c0-80e8-4523-96ac-5c40ddc2075a	bb746e8209f238a0256689407f90bd2cc47bd281e592ca8a3ad309a8e1692b88	2026-07-30 13:10:57.010489+05:45	20260729065449_update_news_model	\N	\N	2026-07-30 13:10:57.007628+05:45	1
13d135c8-f7cb-422e-9c27-ac349fed633e	2511ef424ef7db08b75d3d3dbf13dcf0c20b0e34b8b43a8deadec27073b14761	2026-07-30 13:10:57.022158+05:45	20260729074559_create_admin_table	\N	\N	2026-07-30 13:10:57.010964+05:45	1
388322c4-b1c4-4929-b4ff-f523a870e271	4ea178dbdc4a2485b02a7fcce75e1784c218a14fb3d35b3aa87d4a112ec3b18a	2026-07-30 13:10:57.025862+05:45	20260729130255_add_status_featured	\N	\N	2026-07-30 13:10:57.022792+05:45	1
9565079c-a099-48fe-971c-eb758c17ac2f	fc31e4cc023b3ca7777f53bf1e4b424a5bb7ae92209564835af15c9d7fcf2fc4	2026-07-30 13:10:57.048351+05:45	20260730035311_create_project_tables	\N	\N	2026-07-30 13:10:57.026907+05:45	1
4bf26993-b6bb-4bf5-993f-8008897a3bf0	c6ec16714a7b6f76b8931c9552e704147d70b90db63fc5f63704c0741539e22e	2026-07-30 14:03:50.860689+05:45	20260730081850_add_slug_to_project	\N	\N	2026-07-30 14:03:50.8024+05:45	1
9eb07e43-ff36-4404-930e-c6f68081579e	e6f3f5c0aabad3877569f0933a12ac94afc2a5de6a4b8231c743c5f81652c20a	2026-07-30 19:22:28.727022+05:45	20260730133728_create_investor_tables	\N	\N	2026-07-30 19:22:28.694553+05:45	1
\.


--
-- Name: ActiveTender_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ActiveTender_id_seq"', 1, true);


--
-- Name: Admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Admin_id_seq"', 1, true);


--
-- Name: AnnualReport_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AnnualReport_id_seq"', 4, true);


--
-- Name: AwardNotice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AwardNotice_id_seq"', 1, true);


--
-- Name: Contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Contact_id_seq"', 2, true);


--
-- Name: DividendHistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DividendHistory_id_seq"', 1, true);


--
-- Name: Download_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Download_id_seq"', 1, true);


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_id_seq"', 1, true);


--
-- Name: FinancialHighlight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FinancialHighlight_id_seq"', 5, true);


--
-- Name: FinancialRatio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FinancialRatio_id_seq"', 4, true);


--
-- Name: Governance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Governance_id_seq"', 3, true);


--
-- Name: InternshipProgram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."InternshipProgram_id_seq"', 1, true);


--
-- Name: JobApplication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."JobApplication_id_seq"', 2, true);


--
-- Name: JobOpening_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."JobOpening_id_seq"', 2, true);


--
-- Name: LeadershipTeam_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LeadershipTeam_id_seq"', 1, false);


--
-- Name: MediaGallery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MediaGallery_id_seq"', 2, true);


--
-- Name: News_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."News_id_seq"', 2, true);


--
-- Name: Project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Project_id_seq"', 3, true);


--
-- Name: Setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Setting_id_seq"', 1, false);


--
-- Name: ShareInformation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ShareInformation_id_seq"', 1, true);


--
-- Name: TenderDocument_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TenderDocument_id_seq"', 1, true);


--
-- Name: TenderNotice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TenderNotice_id_seq"', 1, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- Name: VendorRegistration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VendorRegistration_id_seq"', 1, false);


--
-- Name: ActiveTender ActiveTender_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActiveTender"
    ADD CONSTRAINT "ActiveTender_pkey" PRIMARY KEY (id);


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- Name: AnnualReport AnnualReport_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnnualReport"
    ADD CONSTRAINT "AnnualReport_pkey" PRIMARY KEY (id);


--
-- Name: AwardNotice AwardNotice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AwardNotice"
    ADD CONSTRAINT "AwardNotice_pkey" PRIMARY KEY (id);


--
-- Name: Contact Contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_pkey" PRIMARY KEY (id);


--
-- Name: DividendHistory DividendHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DividendHistory"
    ADD CONSTRAINT "DividendHistory_pkey" PRIMARY KEY (id);


--
-- Name: Download Download_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Download"
    ADD CONSTRAINT "Download_pkey" PRIMARY KEY (id);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: FinancialHighlight FinancialHighlight_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FinancialHighlight"
    ADD CONSTRAINT "FinancialHighlight_pkey" PRIMARY KEY (id);


--
-- Name: FinancialRatio FinancialRatio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FinancialRatio"
    ADD CONSTRAINT "FinancialRatio_pkey" PRIMARY KEY (id);


--
-- Name: Governance Governance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Governance"
    ADD CONSTRAINT "Governance_pkey" PRIMARY KEY (id);


--
-- Name: InternshipProgram InternshipProgram_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InternshipProgram"
    ADD CONSTRAINT "InternshipProgram_pkey" PRIMARY KEY (id);


--
-- Name: JobApplication JobApplication_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."JobApplication"
    ADD CONSTRAINT "JobApplication_pkey" PRIMARY KEY (id);


--
-- Name: JobOpening JobOpening_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."JobOpening"
    ADD CONSTRAINT "JobOpening_pkey" PRIMARY KEY (id);


--
-- Name: LeadershipTeam LeadershipTeam_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LeadershipTeam"
    ADD CONSTRAINT "LeadershipTeam_pkey" PRIMARY KEY (id);


--
-- Name: MediaGallery MediaGallery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MediaGallery"
    ADD CONSTRAINT "MediaGallery_pkey" PRIMARY KEY (id);


--
-- Name: News News_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."News"
    ADD CONSTRAINT "News_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Setting Setting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Setting"
    ADD CONSTRAINT "Setting_pkey" PRIMARY KEY (id);


--
-- Name: ShareInformation ShareInformation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ShareInformation"
    ADD CONSTRAINT "ShareInformation_pkey" PRIMARY KEY (id);


--
-- Name: TenderDocument TenderDocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TenderDocument"
    ADD CONSTRAINT "TenderDocument_pkey" PRIMARY KEY (id);


--
-- Name: TenderNotice TenderNotice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TenderNotice"
    ADD CONSTRAINT "TenderNotice_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VendorRegistration VendorRegistration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendorRegistration"
    ADD CONSTRAINT "VendorRegistration_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Admin_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Admin_email_key" ON public."Admin" USING btree (email);


--
-- Name: Project_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Project_slug_key" ON public."Project" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VendorRegistration_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VendorRegistration_email_key" ON public."VendorRegistration" USING btree (email);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict w8cH9n0YwwVx2UNBy65w7UItgjJzZflYkiicev23P8FV29nKw2viHGYqKLuUEBz

