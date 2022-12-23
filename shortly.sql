--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

-- Started on 2022-12-23 17:23:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3350 (class 1262 OID 16613)
-- Name: shortly; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE shortly WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';


ALTER DATABASE shortly OWNER TO postgres;

\connect shortly

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16624)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id_user integer NOT NULL,
    token character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24806)
-- Name: shorten_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shorten_links (
    id integer NOT NULL,
    id_user integer NOT NULL,
    short_url character varying(50) NOT NULL,
    url character varying(100) NOT NULL,
    visit_count integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.shorten_links OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24805)
-- Name: shorten_links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shorten_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shorten_links_id_seq OWNER TO postgres;

--
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 217
-- Name: shorten_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shorten_links_id_seq OWNED BY public.shorten_links.id;


--
-- TOC entry 215 (class 1259 OID 16615)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16614)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3185 (class 2604 OID 24809)
-- Name: shorten_links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shorten_links ALTER COLUMN id SET DEFAULT nextval('public.shorten_links_id_seq'::regclass);


--
-- TOC entry 3182 (class 2604 OID 16618)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3342 (class 0 OID 16624)
-- Dependencies: 216
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id_user, token, created_at) FROM stdin;
1	0e4fc5e3-21e1-4ddf-8440-b0f8a86a9452	2022-12-15 11:34:48.823501
38	a25ad413-096a-4751-a506-b37a98dc6de6	2022-12-15 16:10:18.415803
37	a4896e42-77d7-4e2d-a431-fae2af9e7a83	2022-12-21 11:16:37.801071
39	c3755981-41e3-4103-ab78-4670b7a3833d	2022-12-21 11:41:29.182563
\.


--
-- TOC entry 3344 (class 0 OID 24806)
-- Dependencies: 218
-- Data for Name: shorten_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shorten_links (id, id_user, short_url, url, visit_count, created_at) FROM stdin;
6	1	R8bLRk0K	https://youtube.com.br	0	2022-12-15 15:36:25.608986
8	1	-K6KchSe	https://youtube.com.br	0	2022-12-15 15:41:23.754094
5	1	XbqkZI63	https://google.com.br	4	2022-12-15 15:36:22.056178
7	1	wRstsYYK	https://youtube.com.br	3	2022-12-15 15:36:29.148944
10	37	L4dENHHr	https://youtube.com.br	0	2022-12-15 16:09:40.461472
9	37	IycQEjeT	https://youtube.com.br	2	2022-12-15 16:09:38.818909
\.


--
-- TOC entry 3341 (class 0 OID 16615)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, password, email, created_at) FROM stdin;
1	João	$2b$10$fwiS9iotRoLP9bbMpkRQreF/SvAj9mn.ld9OiUj09PMidy1/bVrcG	joao@driven.com.br	2022-12-14 21:54:58.548451
2	Joao Alfredo	$2b$10$kFlZUlWTSS.8/cx2lvguGOYLMocUil/bNeDJwIJrTsvo5JEUZ4Vq2	joao123@driven.com.br	2022-12-14 21:57:25.240121
37	Maria	$2b$10$XmgPzEIQfidNzxG.rJ1N4.rqdZtpeG0QK6Ofkbsnb24Ht6JkmsIaa	maria@driven.com.br	2022-12-15 16:07:49.922754
38	Joana	$2b$10$RGE1uqM2Z/wPF1n8QH9yJODt9p2mLS8HOwuyPmZqS07P8/sjvuEzO	joana@driven.com.br	2022-12-15 16:10:15.333227
39	Bruno	$2b$10$exbinDVG/4fhhCMigiKIROy5zaFZ2nz5r1DQlJ2hl8ZEPttI68D6i	bruno@driven.com.br	2022-12-21 11:35:54.463438
\.


--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 217
-- Name: shorten_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shorten_links_id_seq', 11, true);


--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 39, true);


--
-- TOC entry 3193 (class 2606 OID 16629)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3195 (class 2606 OID 24813)
-- Name: shorten_links shorten_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shorten_links
    ADD CONSTRAINT shorten_links_pkey PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 16623)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3191 (class 2606 OID 16621)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3196 (class 2606 OID 16630)
-- Name: sessions sessions_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 3197 (class 2606 OID 24814)
-- Name: shorten_links shorten_links_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shorten_links
    ADD CONSTRAINT shorten_links_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


-- Completed on 2022-12-23 17:23:23

--
-- PostgreSQL database dump complete
--

